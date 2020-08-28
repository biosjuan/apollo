const { ApolloServer, gql, ApolloError } = require('apollo-server');
const SessionAPI = require('./datasources/session');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const dataSources = () => ({
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI()
});

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    dataSources,
    debug: false,
    formatError: (err) => {
        return err;
    }
});

server 
    .listen({port: process.env.PORT || 4000})
    .then(({url}) => {
        console.log(`graphQl is runnig at ${url}`);
    })