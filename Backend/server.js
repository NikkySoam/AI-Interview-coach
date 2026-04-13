require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');

const invokeGeminiAi = require('./src/services/ai.service');

connectToDB();


app.listen(3000,()=>{
    console.log("server live on 3000")
})