const express = require('express');
const router = express.Router();

const blogController = require('../controller/blog.controller')



router.post('/articles', blogController.postBlog);

router.post('/articles/:id/comments', blogController.postComment);

router.delete('/comments/:commentId', blogController.deleteComment);

router.get('/articles', blogController.fetchBlogs);




module.exports = router;