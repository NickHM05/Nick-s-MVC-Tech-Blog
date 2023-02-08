const sequelize = require('../config/connection');
const Post = require('../models/Post');
const postData = [
    {
        title:'testtitle',
        content:'content',
        user_id:1
    }
]

const seedPost = () => Post.bulkCreate(postData);
const seedAll = async () => {
    await sequelize.sync({force: false})
    await seedPost()
    process.exit(0)
}

seedAll()

