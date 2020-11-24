const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "secrettoken";

const userResolver = (root, args, ctx, info) => {
    return ctx.user;
}

const signInResolver = (root, { input: { username, password } }, ctx, info) => {
    if (username === "cholo" && password === "1234") {
        const user = {
            id: 1,
            username
        };
        const token = jwt.sign(user, TOKEN_SECRET);
        return {
            ...user,
            token
        };
    }
};

const resolvers = {
    Query: {
        products: productsResolver,
        product: productResolver,
        user: userResolver
    },
    Mutation: {
        signIn: signInResolver
    }
};

