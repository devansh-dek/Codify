const BlogService = require("../services/blog-service");

const blogService = new BlogService();
const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
    try {
        console.log("Checkpoint one for creating blog")
        const userId = req.body.userId || req.user?.id;
        if (!userId) {
            throw new Error("User ID is required to create a blog.");
        }
        const blogData = { ...req.body, user: userId };
        console.log(blogData, "is out blog data")
        const response = await blogService.createBlog(blogData);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            blog: response,
        });
    } catch (error) {
        console.error("Error in create:", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const response = await blogService.getAll();
        return res.status(StatusCodes.OK).json({
            success: true,
            blogs: response
        });
    } catch (error) {
        console.log("Error in getAll function:", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        });
    }
};

const upVote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId // Assuming user ID is in the request context
        const response = await blogService.upvoteBlog(userId, id);
        return res.status(StatusCodes.OK).json({
            success: true,
            blog: response
        });
    } catch (error) {
        console.log("Error in upVote function:", error);
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        });
    }
};

const downVote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId
        const response = await blogService.downvoteBlog(userId, id);
        return res.status(StatusCodes.OK).json({
            success: true,
            blog: response
        });
    } catch (error) {
        console.log("Error in downVote function:", error);
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    upVote,
    downVote
};
