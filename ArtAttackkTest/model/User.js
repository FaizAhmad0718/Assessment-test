const mongoose = require('mongoose');
const { v4: uuidv4 }=require('uuid')
const signUpSchema= new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        unique:true,
        default: uuidv4()
    },
    firstName:{
        type: String,
        required: true,
        unique:true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneno:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
})


const User= mongoose.model('User', signUpSchema);
module.exports= User;