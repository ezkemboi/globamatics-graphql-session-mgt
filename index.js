const { ApolloServer, gql } = require("apollo-server");
const SessionAPI = require("./datasources/sessions");

const typeDefs = gql`
  type Query {
    sessions: [Session]
  }

  type Session {
    id: ID!,
    title: String!,
    description: String,
    startsAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    track: String @deprecated(reason: "Too many sessions do not fit a single track"),
    level: String
  }
`

const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions();
    }
  }
}

const dataSources = () => ({
  sessionAPI: new SessionAPI()
})

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port: process.env.PORT || 5000 })
  .then(({ url }) => {
  console.log(`GraphQL running at ${url}`)
})
