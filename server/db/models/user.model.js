const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
});

module.exports = mongoose.model('User', userSchema);