const mongoose = require('mongoose');
const { blogSchema } = require('./blog.model') 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    dob: Date,
    profileImage: Buffer,
    bio: String,
    blogs: [blogSchema]
});


module.exports = mongoose.model('users', userSchema);