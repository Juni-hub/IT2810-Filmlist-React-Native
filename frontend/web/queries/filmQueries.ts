import { gql } from '@apollo/client'

/** 
* Query for searing for films
*/
export const SEARCH_FILMS = gql`
  query getPosts($limit: Int!, $offset: Int!, $titleFilter: String, $genreFilter: String, $yearFilter: Int, $sorting: Int) {
    getFilteredPosts(limit: $limit, offset: $offset, titleFilter: $titleFilter, genreFilter: $genreFilter, yearFilter: $yearFilter, sorting: $sorting) {
        _id
        title
        year
        cast
        genres
    }
  },
`;

/** 
* Mutation for adding a film to the database
*/
export const ADD_FILM = gql`
  mutation createPost($title: String!, $year: Int, $cast: [String], $genres: [String]) {
    createPost(title: $title, year: $year, cast: $cast, genres: $genres) {
      _id
      title
      year
      cast
      genres
    }
  }
`;
