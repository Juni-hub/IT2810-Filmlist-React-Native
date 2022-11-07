const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const cors = require('cors');

async function startServer() {
  const app = express()
  const apolloServer = new ApolloServer({ 
    typeDefs: typeDefs,
    resolvers: resolvers
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello from express apollo server")
  });

  app.use(cors());
  
  await mongoose.connect("mongodb://admin:password@it2810-34.idi.ntnu.no:27017/admin?directConnection=true", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongoose connected...")

  app.listen({ port: 4000 }, () => 
    console.log(`Server is running at http://localhost:4000${apolloServer.graphqlPath}`)
  );
}

startServer()