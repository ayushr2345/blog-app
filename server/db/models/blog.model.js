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
    authorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
});

module.exports.Blog = mongoose.model('Blog', blogSchema);