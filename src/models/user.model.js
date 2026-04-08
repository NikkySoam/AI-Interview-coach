const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: [true, "username already taken"],
        required: true
    },
    email:{
        type:string,
        unique: [true, "Account already exists with this email address"],
        required: true
    },
    password:{
        type:string,
        required: true
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel