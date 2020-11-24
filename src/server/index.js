const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('../resolvers');
/* const { createStore } = require('./utils');



const ProductAPI = require('./datasources/product');
const UserAPI = require('./datasources/user');


const store = createStore(); */

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});