const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    datePublished: {
        type: String,
        required: true
    },
    authodId: mongoose.Schema.ObjectId
});

module.exports.blogSchema = blogSchema;
module.exports.Blog = mongoose.model('Blog', blogSchema);