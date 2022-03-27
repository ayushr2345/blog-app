const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const userRouter = require('./routes/users.routes');

require('dotenv').config();
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(cors({origin: ["http://localhost:3000", "http://localhost:3000"], credentials: true }));;
//app.use(cors());

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URI,
        collection: "sessions"
    }),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        httpOnly: false,
        sameSite: "strict"
    }
}));

require('./auth/local');
app.use(passport.initialize());
app.use(passport.session());


// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// });


app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`App listening on https:localhost:${PORT}`);
});