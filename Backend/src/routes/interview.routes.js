const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @desc Generate interview report based on resume or self-description
 * @access Private
 */
interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report by ID
 * @access Private
 */
interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportByIdController);


/**
 * @route GET /api/interview/reports
 * @desc Get all interview reports of the logged in user
 * @access Private
 */
interviewRouter.get('/',authMiddleware.authUser,interviewController.getAllInterviewReportsController);
 

module.exports = interviewRouter