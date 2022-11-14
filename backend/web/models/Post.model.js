const mongoose = require('mongoose');

/** 
* Defines a schema for documents in the collection
*/

const PostSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    cast: {
        type: [String]
    },
    genres: {
        type: [String]
    }
    },
    { collection: 'post' }
);

const Post = mongoose.model('post', PostSchema);

module.exports = Post;