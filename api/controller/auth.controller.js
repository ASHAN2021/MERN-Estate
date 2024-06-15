import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req,res,next)=>{
        const {email,password} = req.body;
        try {
            const ValidUser = await User.findOne({email});
            if(!ValidUser) return next(errorHandler('401','User not found'));
            const ValidPassword = bcryptjs.compareSync(password,ValidUser.password);
            if(!ValidPassword) return next(errorHandler('404','Invalid Password'));
            const token = jwt.sign({id:ValidUser._id},process.env.JWT_SECRET);
            const {password:pass, ...rest} = ValidUser._doc;
            res.cookie('access_token',token,{httpOnly:true})
            .status(200).json(rest)
        } catch (error) {
            next(error)
        }
};

export const google =async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email}) 
        if(user){
            const token = jwt.sign({id:user_id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name.split(" ").join("").toLowercase()+Math.random().toString(36).slice(-4),
                email:req.body.email,password:hashedPassword,avatar:req.body.photo
            })
            await newUser.save();
            const token = jwt.sign({id: newUser_id},process.env.JWT_SECRET);
            const {password:pass,...rest}=newUser._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error);
    }
}