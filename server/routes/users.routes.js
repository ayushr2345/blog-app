const express = require('express');
const User = require('../db/models/user.model');
const userRouter = express.Router();
const passportLocal = require('../auth/local');
const { generatePassword } = require('../auth/pwUtils');

/*
---------- CREATE A USER ----------
*/
userRouter.post('/signup', async (req, res) => {
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
                return res.status(200).json({
                    user: user
                });
            });
    }
});

/*
---------- LOGIN A USER ----------
*/

userRouter.post('/login', passportLocal.authenticate('local'), (req, res) => {
    return res.status(200).json({
        message: "logged in"
    });
});

module.exports = userRouter;