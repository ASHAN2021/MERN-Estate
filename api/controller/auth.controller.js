import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utills/error.js";

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashpassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashpassword
    });
    await newUser.save().then(()=>{
        res.status(200).json("User created sucessfully!!!");
    }).catch((error)=>{
       next(error);
    })   
};