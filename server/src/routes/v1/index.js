const express = require('express');
const router = express.Router();
const { UserController, BlogController, VoteController, ProblemController, TestCaseController, SubmissionController } = require('../../controllers');
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
//problems
router.post('/problem', ProblemController.create);
router.get('/problem', ProblemController.getAll);
router.get('/problems', ProblemController.getProblems);
router.get('/problems/:id', ProblemController.getProblemId);

//testcases
router.post('/testcase', TestCaseController.create);
//submissions
router.post('/submission', SubmissionController.create);
router.post('/runcode', SubmissionController.create);
module.exports = router