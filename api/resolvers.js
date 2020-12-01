/* const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "secrettoken"; */
const Bcrypt = require("bcrypt");
const { User, Product } = require("./models");
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
    root,
    { input: { username, password, email, name, dni } },
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
        email,
        name,
        dni
    });
    await user.save();
    return user.toJSON();
};

export const resolvers = {
    Query: {
        products: productsResolver,
        product: productResolver,
        user: userResolver
    },
    Mutation: {
        signIn: signInResolver,
        signUp: signUpResolver
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
        }, /*
        favorites: async user => {
            // Return favorite pokemons
            // const favorites = await PokemonFavorites.find({ userId: user.id });
            // const pokemons = await fetchPokemons();
            // return pokemons.filter(x => favorites.includes(x.id));
            return [];
        } */
    }
};

