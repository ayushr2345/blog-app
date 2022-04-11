const express = require('express');
const User = require('../db/models/user.model');
const userRouter = express.Router();
const passportLocal = require('../auth/local');
const { generatePassword } = require('../auth/pwUtils');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// MIDDLEWARE FOR IMAGE INPUT
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

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

userRouter.post('/login', passportLocal.authenticate('local'), (req, res) => {
    // it creates a session even when the user is not present in the db
    return res.status(200).json({
        message: "logged in",
    });
});

/*
---------- LOGOUT A USER ----------
*/

userRouter.get('/logout', (req, res) => {
    req.logout();
    console.log("asdf");
    res.clearCookie('connect.sid');
    console.log("asdf 2");
    req.session.destroy((err) => {
        console.log("asdf 3");
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
userRouter.get('/session', async (req, res) => {
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

/*
---------- GET USER'S NAME TO DISPLAY IN THE ARTICLE CARD ----------
*/
userRouter.post('/get-name', async (req, res) => {
    if (req.body.authorId) {
        User.findOne({_id: req.body.authorId}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({
                    user: user
                });
            }
        });
    }
});

/*
---------- UPDATE A USER ----------
*/
userRouter.put('/update', async (req, res) => {
    const user = req.body.data.user;
    if (req.body.data.user) {
        User.findOneAndUpdate({_id: user._id}, user, {new: true}, (err, updatedUser) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json({
                    updatedUser: updatedUser
                });
            }
        });
    }
});

/*
---------- UPDATE PROFILE IMAGE ----------
*/
userRouter.post('/update-profile-image', async (req, res) => {
    // const user = req.body.data.user;
    // const image = req.body.data.image;
    // console.log(req.body)
    // req.user.profileImage = req.body;

    // console.log(req.body.image)
    if (req.body) {
        User.findOneAndUpdate({_id: req.user._id}, {$set: {profileImage: req.body.image}}, {new: true}, (err, newUser) => {
            if (err) {
                console.log("")
            } else {
                return res.status(200).json({
                    message: "success"
                });
            }
        });
    }
});

/*
---------- DELETE A USER ----------
*/
userRouter.delete('/delete', async (req, res) => {
    // console.log(req.body);
    if (req.body) {
        User.findOneAndDelete({_id: req.body._id}, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("deleted")
            }
        });
    }
});
module.exports = userRouter;