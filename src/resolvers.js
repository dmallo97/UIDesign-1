module.exports = {
    Query: {
        products: () => products,
        user: (_, __, { dataSources }) => dataSources.userAPI.findUser(),
    }
}
