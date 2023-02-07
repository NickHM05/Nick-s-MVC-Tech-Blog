// Get all the comments for a specific post from line 3
const router = require('express').Router();
const { Comment } = require('../../models');
const authorHere = require('../../utils/auth');

// Next we need to create a comment
router.post('/', async (req, res) => {
    console.log("comment created.")
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        console.log(newComment)
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updating the comment.

// Deleting the comment function will go here
router.delete('/:id', authorHere, async (req, res) => {
    try {
        const postComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(commentData) {
            res.status(200).json(commentData)
        } else {
            res.status(404).json({ message: 'There is no comment with this id in the database.'});
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;