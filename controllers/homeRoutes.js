const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const authorHere = require('../utils/auth');

// this is the login handler
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});
// Get all posts
router.get("/", async (req, res) => {
    console.log("all posts from get recieved")
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }]
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// get a specific post using the id
router.get("/post/:id", async (req, res) => {
    // check for login. if false redirect to login to try again with correct login info
    if (req.session.loggedIn = false) {
        res.redirect("/login")
    } else {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ["name"]
                    },
                    {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: ["name"]
                        }
                    },
                ],
            });

            if (postData) {
                const post = postData.get({ plain: true });
                res.render("viewpost", {
                    post,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).json({ message: "No post is found with this id" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

module.exports = router;
