const express = require('express');
const router = express.Router();
const { UserController, BlogController, VoteController, ProblemController, TestCaseController, SubmissionController } = require('../../controllers');
const { authenticateJWT } = require('../../middlewares/auth-validator');
// authentication
router.post('/signup', UserController.create);
router.post('/login', UserController.login);
router.get('/isauthenticated', UserController.isAuthenticated);

//blogs

router.post('/blogs', authenticateJWT, BlogController.create);
router.get('/blogs', BlogController.getAll);
router.patch('/blogs/:id/upvote', authenticateJWT, BlogController.upVote);
router.patch('/blogs/:id/downvote', authenticateJWT, BlogController.downVote);
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
router.post('/submission', authenticateJWT, SubmissionController.create);
router.post('/runcode', authenticateJWT, SubmissionController.create);
router.get('/submission/:userId', SubmissionController.showSubmissions);
router.get('/:userId/heatmap', SubmissionController.heatMap);
module.exports = router