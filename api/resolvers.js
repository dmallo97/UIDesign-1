/* const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "secrettoken"; */
const Bcrypt = require("bcrypt");
const { User, Product, ShoppingCart } = require("./models");
const { generateToken } = require("./auth");

const userResolver = async (root, args, ctx, info) => {
    const userId = ctx.user._id;
    const user = await User.findById(userId);
    return user;
}

const productResolver = async (root, { id }, ctx, info) => {
    const product = await Product.findById(id);
    return product;
}

const productsResolver = async (root, args, ctx, info) => {
    const products = await Product.find();
    return products;
}

const signInResolver = async (
    root,
    { input: { username, password } },
    ctx,
    info
) => {
    const user = await User.findOne({ username });
    if (user && Bcrypt.compareSync(password, user.password || "")) {
        return user;
    }
};

const signUpResolver = async (
    { input: { username, password, firstname, lastname, email, dni, country, city } }, //falta agregar imagen, si no sabemos la pelamos
    root,
    ctx,
    info
) => {
    const currentUser = await User.findOne({ username });
    if (currentUser) {
        throw new Error("UsernameAlreadyInUse");
    }
    const user = new User({
        username,
        password: Bcrypt.hashSync(password, 10),
        firstname,
        lastname,
        email,
        dni,
        country,
        city
    });
    await user.save();
    return user.toJSON();
};

const uploadProductResolver = async (
    root,
    { input: { title, size, quantity, productImage } },
    ctx,
    info
) => {
    if (title.length === 0) {
        throw new Error("Debe ingresar un título.");
    }
    const newProduct = new Product({
        title,
        size,
        quantity,
        productImage
    });
    await newProduct.save();
    return newProduct.toJSON();
}

const updateUserResolver = async (
    { input: { username, password, firstname, lastname, email, dni, country, city } }, //falta profileImage
    root,
    ctx,
    info
) => {
    const user = ctx.user;

    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.dni = dni;
    user.country = country;
    user.city = city;

    await user.save();
    return user.toJSON();
};

const addProductToCartResolver = async (
    {
        input: {
            productId,
            userId
        } },
    root,
    ctx,
    info
) => {
    //const user = ctx.user;

    const shoppingCart = await ShoppingCart.findOne(userId);
    const product = Product.findById(productId);

    await shoppingCart.products.push(product);
    return shoppingCart.toJSON();
};

export const resolvers = {
    Query: {
        products: productsResolver,
        product: productResolver,
        user: userResolver
    },
    Mutation: {
        signIn: signInResolver,
        signUp: signUpResolver,
        addProductToCart: addProductToCartResolver,
        uploadProduct: uploadProductResolver,
        updateUser: updateUserResolver
    },
    User: {
        id: user => user._id,
        token: (user, args, ctx, info) => {
            const token = generateToken(user);

            // ctx.cookie("token", token, {
            //   expires: new Date(Date.now() + 9999999999),
            //   secure: true,
            //   sameSite: "None"
            // });
            return token;
        }

        /*
           favorites: async user => {
               // Return favorite pokemons
               // const favorites = await PokemonFavorites.find({ userId: user.id });
               // const pokemons = await fetchPokemons();
               // return pokemons.filter(x => favorites.includes(x.id));
               return [];
           } */
    },
    Product: {
        id: product => product._id
    }
};
