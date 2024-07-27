const express = require('express');
const router = express.Router();
const { UserController, BlogController, VoteController } = require('../../controllers');
// authentication
router.post('/signup', UserController.create);
router.post('/login', UserController.login);
router.post('/isauthenticated', UserController.isAuthenticated);

//blogs

router.post('/blogs', BlogController.create);
router.get('/blogs', BlogController.getAll);
router.patch('/blogs/:id/upvote', BlogController.upVote);
router.patch('/blogs/:id/downvote', BlogController.downVote);
//vote
router.post('/vote', VoteController.vote);




module.exports = router