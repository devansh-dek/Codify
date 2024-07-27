const { BlogRepository } = require('../repository/index');

class BlogService {
    constructor() {
        this.BlogRepository = new BlogRepository();
    }

    async getAll() {
        try {
            const response = await this.BlogRepository.getAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createBlog(data) {
        try {
            const response = await this.BlogRepository.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async upvoteBlog(userId, blogId) {
        try {
            const response = await this.BlogRepository.vote(userId, blogId, 'upvote');
            return response;
        } catch (error) {
            throw error;
        }
    }

    async downvoteBlog(userId, blogId) {
        try {
            const response = await this.BlogRepository.vote(userId, blogId, 'downvote');
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BlogService;
