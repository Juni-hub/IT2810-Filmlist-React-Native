const Post = require("./models/Post.model");
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    getFilteredPosts: async (_, { offset, limit, titleFilter, genreFilter, yearFilter, sorting } ) => {
      let filters = "{}";
      let data = null;
      var filterjson = JSON.parse( filters);

      if (titleFilter != "") {
        titleRegex = new RegExp(titleFilter, "i");
        filterjson.title = titleRegex;
      } if (genreFilter != "") {
        filterjson.genres = {$all : [genreFilter]};
      } if (yearFilter != 0) {
        filterjson.year = yearFilter;
      } 
      data = await Post.find(filterjson).sort({year: sorting});
      return data.slice(offset, limit + offset);
    },
  }, 
  Mutation: {
    createPost: async (_, { title, year, cast, genres } ) => {
      const newPost = await new Post({
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: title,
        year: year, 
        cast: cast, 
        genres: genres,
      })

      return newPost.save().catch(err => err);
    }
  }
};

module.exports = resolvers;