const express = require('express');
const { session } = require('passport');
const blogRouter = express.Router();
const Blog = require('../db/models/blog.model').Blog;

/*
---------- ADD A BLOG ----------
*/
blogRouter.post('/add', (req, res) => {
    const id = req.user._id.toLocaleString();
    const date = new Date();
    const newBlog = new Blog ({
        title: req.body.title,
        article: req.body.article,
        datePublished: date.toISOString(),
        authorId: id
    });

    newBlog.save()
        .then((blog) => {
            return res.status(200).json({
                blog: blog
            });
        });
});

/*
---------- GET ALL BLOGS ----------
*/
blogRouter.get('/get-all', (req, res) => {
    Blog.find({}, (err, allBlogs) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                blogs: allBlogs.reverse()
            });
        } 
    });
});

/*
---------- GET A BLOG ----------
*/
blogRouter.post('/get-one', (req, res) => {
    Blog.find({ _id: req.body.id }, (err, allBlogs) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                blogs: allBlogs.reverse()
            });
        } 
    });
});

/*
---------- UPDATE A BLOG ----------
*/
blogRouter.put('/update', (req, res) => {
    const updatedBlog = req.body.blog;
    Blog.findOneAndUpdate({_id: req.body.blog._id}, updatedBlog, {
            new: true
        }, (err, newBlog) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({
                    updatedBlog: newBlog
                });
            }
        });
});

/*
---------- DELETE A BLOG ----------
*/
blogRouter.delete('/delete', (req, res) => {
    Blog.deleteOne({_id: req.body.id}, {new: true}, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json ({
                deletedBlog: blog
            });
        }
    });
});

/*
---------- DELETE ALL BLOGS ----------
*/
blogRouter.delete('/delete-all', (req, res) => {
    // console.log(req.body.user)
    Blog.deleteMany({authorId: req.body.user._id}, {new: true}, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json ({
                message: "Deleted all blogs"
            });
        }
    });
});
module.exports = blogRouter;