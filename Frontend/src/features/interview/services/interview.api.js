import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export const generateReport = async ({selfDescription, jobDescription, resumeFile})=>{
    const formData = new FormData();
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post('/api/interview', formData, {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data;
}

export const getReportById = async (interviewId)=>{
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

export const getAllReports = async ()=>{
    const response = await api.get('/api/interview');
    return response.data;
}