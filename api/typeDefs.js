const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        token: String!
        username: String!
        password: String!
        name: String
        lastname: String
        email: String
        dni: String!
        country: String
        city: String
        profileImage: String
        products: [Product]
    }

    type Product {
        id: ID!
        title: String
        size: String
        quantity: Int
        productImage: String
    }

    type ShoppingCart {
        userId: ID!
        products: [Product]
    }

    type Query {
        products: [Product]!
        product(id: ID!): Product
        user: User
    }

    input UserInput {
        id: ID
        username: String!
        password: String!
        name: String
        lastname: String
        email: String
        country: String
        city: String
        profileImage: String
    }

    input SignInInput {
        username: String!
        password: String!
    }

    type Mutation {
        #uploadProduct(productID: ID!): Product
        #addProductToCart(productID: ID!, userID: ID!): User!
        updateUser(input: UserInput!): User!
        signIn(input: SignInInput!): User!
        signUp(input: UserInput!): User!
    }
`;

module.exports.typeDefs = typeDefs;