const mongoose = require('mongoose');
const fs = require('fs');

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
    profileImage: {
        required: true,
        type: String,
        default: "data:image/png;base64," + fs.readFileSync(`public/logo192.png`).toString('base64')
    },
    
    bio: String,
});


module.exports = mongoose.model('users', userSchema);