const express = require('express');
const User = require('../db/models/user.model');
const userRouter = express.Router();
const passportLocal = require('../auth/local');
const { generatePassword } = require('../auth/pwUtils');
require('dotenv').config();

/*
---------- CREATE A USER ----------
*/
userRouter.post('/auth/signup', async (req, res) => {
    const { salt, hash } = generatePassword(req.body.password);
    
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            message: "User already exists !"
        });
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            salt: salt,
            hash: hash,
        });
        
        newUser.save()
            .then((user) => {
                req.logIn(user, (err) => {
                    if (err) {
                        return res.json ({
                            error: err
                        });
                    } else {
                        return res.status(200).json({
                            message: "signed up",
                        });
                    }
                });
            });
    }
});

/*
---------- LOGIN A USER ----------
*/

userRouter.post('/auth/login', passportLocal.authenticate('local'), (req, res) => {
    // it creates a session even when the user is not present in the db
    return res.status(200).json({
        message: "logged in",
    });
});

/*
---------- LOGOUT A USER ----------
*/

userRouter.get('/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({
                message: "successfully deleted the session"
            });
        }
    });
});

/*
---------- CHECK FOR SESSION IN SESSION COLLECTION ----------
*/
userRouter.get('/auth/session', async (req, res) => {
    if (req.user) {
        const user = await User.findOne({ _id: req.user._id });
        return res.json({
            user: user
        });
    } else {
        return res.json({
            user: null
        });
    }
});

module.exports = userRouter;