const pdfparse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");

/**
 * @desc Generate interview report based on resume or self-description
 */
 const generateInterviewReportController = async (req,res)=>{
    const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription,jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"interview report generated successfully..",
        interviewReport
    })
}

/**
 * @desc Get interview report by ID
 */
const getInterviewReportByIdController = async (req,res)=>{
    const { interviewId }= req.params;
    const interviewReport = await InterviewReportModel.findOne({_id:interviewId, user:req.user.id});

    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found!"
        })
    }

    res.status(200).json({
        message: "Interview Report fetched successfully.",
        interviewReport
    })
}

/**
 * @desc Get all interview reports of the logged in user
 */
const getAllInterviewReportsController = async (req,res) =>{
    const interviewReports = await InterviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -skillGaps -preparationPlan -technicalQuestions -behavioralQuestions ");


    res.status(200).json({
        message: "Interview Reports fetched successfully.",
        interviewReports
    })
}

module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController}