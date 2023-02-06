// Get all the comments for a specific post from line 3
const router = require('express').Router();
const { Comment } = require('../../models');

// Next we need to create a comment
router.post('/', async (req, res) => {
    try {
        const oneComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(oneComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updating the comment will go here

// Deleting the comment function will go here
router.delete('/:id', async (req, res) => {
    try {
        const postComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postComment) {
            res.status(404).json({ message: 'There is no comment with this id in the database.'});
            return;
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;