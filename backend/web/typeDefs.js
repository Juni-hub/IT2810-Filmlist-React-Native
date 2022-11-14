const { gql } = require("apollo-server-express");

/** 
* Define types for GraphQL queries
*/

const typeDefs = gql`
  type Post {
     _id: ID
    title: String
    year: Int
    cast: [String]
    genres: [String]
  }
    
  type Query {
    getFilteredPosts(offset: Int, limit: Int, titleFilter: String, genreFilter: String, yearFilter: Int, sorting: Int): [Post!]
  }

  type Mutation {
    createPost(title: String, year: Int, cast: [String], genres: [String]): Post
  }
`;

module.exports = typeDefs;