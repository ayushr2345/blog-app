const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: String,
    email: mongoose.SchemaTypes.email,
})