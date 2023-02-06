// Get all the posts for a specific post from line 3
const router = require('express').Router();
const { Post } = require('../../models');
const authorHere = require("../../utils/auth");

// let's render the post page
router.get("/", async(req, res) => {
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

// Get all the posts
router.get('/',async (req, res) => {
    try {
        const postData = await Post.findAll({});

        const posts = postData.map((post) =>
        post.get({ plain:true })
        );

        req.session.save(() => {
            // save the last action date and time to session maybe?
            //req.session

            res.render("", {
                posts
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500),json(err);
    }
});

//get a specific post
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "content",
              "date_created",
              "user_id",
            ],
          },
        ],
      });

      const post = postData.get({ plain: true });
      res.render("handlebarsviewhere", {
        post,
        // There is no incrementing the 'countVisit' session variable here
        // but simply sending over the current 'countVisit' session variable to be rendered
        countVisit: req.session.countVisit,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

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

// Updating the post

// Deleting the post function will go here
router.delete('/:id', authorHere, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(200).json(postData);
        } else {
            res.status(404).json({ message: "post " + req.params.id + 'There is no post with this id in the database.'});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;