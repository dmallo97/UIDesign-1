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

    input UploadProductInput{
        title: String!
        size: String!
        quantity: Int!
        productImage: String
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
        dni: String!
        country: String
        city: String
        profileImage: String
    }

    input SignInInput {
        username: String!
        password: String!
    }

    type Mutation {
        uploadProduct(input: UploadProductInput!): Product
        #addProductToCart(productID: ID!, userID: ID!): User!
        #updateUser(input: UserInput!): User!
        #createUser(input: UserInput!): User!
        signIn(input: SignInInput!): User!
        signUp(input: UserInput!): User!
        #login(input: SignInInput!): User! 
    }
`;

module.exports.typeDefs = typeDefs;