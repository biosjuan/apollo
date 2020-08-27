const { ApolloServer, gql } = require('apollo-server');
const SessionAPI = require('./datasources/session');
// const sessions = require('./data/sessions.json');

const typeDefs = gql`
type Query {
    sessions:[Session]
}
type Session {
    id: ID!,
    title: String!,
    description: String,
    startAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    track: String @deprecated(reason: "Too many sessions"),
    level: String
}`

const resolvers = {
    Query: {
        sessions: (parent, args, {dataSources}, info) => {
            return dataSources.SessionAPI.getSessions();
        }
    }
}

const dataSources = () => ({
    SessionAPI: new SessionAPI()
});

const server = new ApolloServer({typeDefs, resolvers, dataSources});

server 
    .listen({port: process.env.PORT || 4000})
    .then(({url}) => {
        console.log(`graphQl is runnig at ${url}`);
    })