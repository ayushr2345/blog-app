const express = require('express');
const cors = require('cors');
const router = require("./routes/users.routes");
require('dotenv').config();
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on https:localhost/${PORT}`);
});