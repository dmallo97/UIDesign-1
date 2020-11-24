const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
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
        quantity: String
        productImage: String
    }

    type Query {
        products: [Product]!
        product(id: ID!): Product
        user(username: String!, password: String!): User
    }

    type UserInput {
        id: ID!
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

    type SignInInput {
        username: String!
        password: String!
    }

    type Mutation {
        uploadProduct(productID: ID!): Product
        addProductToCart(productID: ID!, userID: ID!): User!
        updateUser(input: UserInput!): User!
        createUser(input: UserInput!): User!
        login(input: SignInInput!): String # login token
    }
`;

module.exports = typeDefs;