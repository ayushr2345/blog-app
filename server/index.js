const express = require('express');
require('dotenv').config();
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("asdfg");
});

app.listen(PORT, () => {
    console.log(`App listening on https:localhost/${PORT}`);
});