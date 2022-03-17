const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("../db/models/user.model");

/*
    GET ALL USERS
*/
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.json({reply: "unsuccessful"});
            return console.error(err);
        } else {
            res.json({users});
        }
    });
});

/*
    GET ONE USER
*/
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    User.findById({_id: userId}, (err, user) => {
        if (err) {
            res.json({error: err.kind});
            return console.error(err);
        } else {
            if (user) {
                res.json({user});
            } else {
                res.json({message: "User does not exist"});
            }            
        }
    });
});

/*
    ADD ONE USER
*/
router.post('/users/new', (req, res) => {
    const newUser = new User (req.body);
    newUser.save().then((savedUser) => {
        res.json({
            user: savedUser,
            message: "User saved",
            success: true
        });
    });
});

/*
    DELETE ONE USER
*/
router.delete('/users/delete/:id', (req, res) => {
    const userId = req.params.id;
    User.findByIdAndDelete({_id: userId}, (err, deletedUser) => {
        if (err) {
            res.json({error: err.kind});
            return console.error(err);
        } else {
            if (deletedUser) {
                return res.status(200).json({
                    user: deletedUser,
                    message: "deleted"
                });
            } else {
                return res.status(404).json({
                    message: "User Not found"
                });
            }
        }
    });
});

/*
    UPDATE ONE USER
*/
router.put('/users/update/:id', (req, res) => {
    // using {new: true} so that the findByIdAndUpdate returns the updated User
    const userId = req.params.id;
    const updatedUser = req.body;
    User.findByIdAndUpdate({_id: userId}, updatedUser, {new: true}, (err, updatedUser) => {
        if (err) {
            res.json({error: err.kind});
            return console.error(err);
        } else {
            if (updatedUser) {
                return res.status(200).json({
                    user: updatedUser,
                    message: "updated"
                });
            } else {
                return res.status(404).json({
                    message: "User Not found"
                });
            }
        }
    });
});

module.exports = router;