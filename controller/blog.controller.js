const  Blog  = require('../model/blog');

const Comment = require('../model/comment');


const postBlog = async (req, res) => {
    try {
        const { title, author, content } = req.body;

        
        if (!title || !author || !content) {
            return res.status(400).json({ error: 'Title, author, and content are required.' });
        }

        const newBlog = await Blog.create({ title, author, content });
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error in post controller:', error); // Log the full error
        res.status(500).json({ error: 'Failed to create blog post.' });
    }
};




const postComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { content } = req.body;

       
        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

       
        const newComment = await Comment.create({ content, blogId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment.' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

       
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

       
        await comment.destroy();
        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment.' });
    }
};

const fetchBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content'],
                }
            ],
            order: [['createdAt', 'DESC']],
        });
        console.log(blogs)
        res.status(200).json(blogs);
    } catch (error) {
        console.log('Error in fetching article');
        console.error('Error fetching blogs:', error.toString()); 
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Failed to fetch blog posts.' });
    }
};


module.exports = {
    postBlog,
    postComment,
    deleteComment,
    fetchBlogs
}





