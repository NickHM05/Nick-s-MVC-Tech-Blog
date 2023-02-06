// Get all the posts for a specific post from line 3
const router = require('express').Router();
const { Post } = require('../../models');

// Next we need to create a post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updating the post will go here

// Deleting the post function will go here
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({ message: 'There is no post with this id in the database.'});
            return;
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;