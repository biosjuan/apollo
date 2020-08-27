const { ApolloServer, gql } = require('apollo-server');
const SessionAPI = require('./datasources/session');

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const dataSources = () => ({
    sessionAPI: new SessionAPI()
});

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    dataSources
});

server 
    .listen({port: process.env.PORT || 4000})
    .then(({url}) => {
        console.log(`graphQl is runnig at ${url}`);
    })