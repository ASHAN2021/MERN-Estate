import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:'https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/circle-icon.png'
    }
},{timestamps:true});

const User = mongoose.model("user",UserSchema);

export default User;