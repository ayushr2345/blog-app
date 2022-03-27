const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../db/models/blog.model');
const blogRouter = express.Router();

/*
---------- ADD A BLOG ----------
*/
blogRouter.post('/auth/add', (req, res) => {
    const newBlog = new Blog ({
        title: req.body.title,
        article: req.body.article,
        datePublished: new Date().toLocaleString,
        authorID: mongoose.Types.ObjectId("asdfadgfagadsfgadsfg")
    });

    newBlog.save()
        .then((blog) => {
            return res.status(200).json({
                blog: blog
            });
        });
})

module.exports = blogRouter;