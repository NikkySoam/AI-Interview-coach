
const { GoogleGenAI} = require("@google/genai");
const {z} = require("zod");
// const { zodToJsonSchema } = require("zod-to-json-schema");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score indicating how well the candidate's profile matches the job requirements, typically represented a score between 0 and 100."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview."),
        intention: z.string().describe("The intention behind asking the technical question."),
        answer: z.string().describe("How to answer this question,what are the key points to be covered in the answer,what approach should be used to answer the question,what are the common pitfalls to avoid while answering this question etc.")
    })).describe("Technical questions asked during the interview, along with their intentions and suggested answers."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview."),
        intention: z.string().describe("The intention behind asking the behavioral question."), 
        answer: z.string().describe("How to answer this question,what are the key points to be covered in the answer,what approach should be used to answer the question,what are the common pitfalls to avoid while answering this question etc.")
    })).describe("Behavioral questions asked during the interview, along with their intentions and suggested answers."),
    skillGaps: z.array(z.object({   
        skill: z.string().describe("The skill that the candidate is lacking based on the interview performance."),
        severity: z.enum(["Low","Medium","High"]).describe("The severity of the skill gap, which can be categorized as Low, Medium, or High.")
    })).describe("Identified skill gaps based on the interview performance, along with their severity levels."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, indicating the sequence of the preparation steps."),
        focus: z.string().describe("The specific focus or topic that the candidate should concentrate on for that day in order to improve their skills and address the identified gaps."),
        tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to work towards improving their skills and preparing for future interviews.")
    })).describe("A structured preparation plan for the candidate, outlining daily focus areas to help them improve their skills and perform better in future interviews."),
    title:z.string().describe("The title of the interview report, which can be based on the job position or role that the candidate is applying for.")  
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    const prompt = `generate an interview report for a candidate based on the following information:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
    responseMimeType: "application/json",
    responseSchema: z.toJSONSchema(interviewReportSchema), // code from documentation is not working
  }
  });


  return JSON.parse(response.text);
}



module.exports = {generateInterviewReport,generateResumePdf};


