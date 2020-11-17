const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        username: String
        password: String
        name: String
        lastname: String
        email: String
        dni: String
        country: String
        city: String
        profileImage: profileImage
    }

    type Product {
        id: ID!
        title: String
        size: String
        quantity: String
        productImage: productImage
    }

    type Query {
        products: [Product]!
        product(id: ID!): Product
        user(username: String!, password: String!): User
    }

    type Mutation {

    }
`;

module.exports = typeDefs;