const CrudRepository = require('./crud-repository');
const { Blogs, Vote } = require('../models/index');

class BlogRepository extends CrudRepository {
    constructor() {
        super(Blogs);
    }

    async vote(userId, blogId, voteType) {
        try {
            const blog = await Blogs.findByPk(blogId, {
                include: [{ model: Vote, as: 'votes' }]
            });

            if (!blog) {
                throw new Error("Blog Not Found");
            }

            console.log("Blog:", blog);
            console.log("User ID:", userId);

            // Check the type of blog.votes and log it
            console.log("Votes Array:", blog.votes);
            console.log("Type of blog.votes:", Array.isArray(blog.votes));

            // Ensure votes are properly populated and iterable
            if (!Array.isArray(blog.votes)) {
                throw new Error("Votes data is not an array.");
            }

            // Debugging the vote array
            blog.votes.forEach(vote => {
                console.log("Vote Object:", vote);
                console.log("Vote User ID Type:", typeof vote.userId);
                console.log("Vote User ID Value:", vote.userId);
                console.log("User ID Type:", typeof userId);
                console.log("User ID Value:", userId);
            });

            // Convert userId to the same type as vote.userId if necessary
            const userIdAsString = String(userId);

            // Find existing vote
            const existingVote = blog.votes.find(vote => {
                console.log("Comparing:", String(vote.userId), userIdAsString);
                return String(vote.userId) === userIdAsString;
            });

            console.log("Existing Vote:", existingVote ? existingVote.dataValues : "None");

            if (existingVote) {
                // If the existing vote type is different, update it
                console.log("here");
                if (existingVote.voteType !== voteType) {
                    existingVote.voteType = voteType;
                    await existingVote.save();
                }

            } else {
                // Create new vote only if no existing vote by the user
                await Vote.create({ userId, blogId, voteType });
            }

            // Recalculate votes
            const upvotes = blog.votes.filter(vote => vote.voteType === 'upvote').length;
            const downvotes = blog.votes.filter(vote => vote.voteType === 'downvote').length;

            blog.upvotes = upvotes;
            blog.downvotes = downvotes;

            await blog.save();

            return blog;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}

module.exports = BlogRepository;
