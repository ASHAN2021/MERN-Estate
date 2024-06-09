import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const URL= process.env.MONGODB_URL;

mongoose.connect(URL).then(()=>{
    console.log("Mongodb is connected");
}).catch((err)=>{
    console.log(err);
});

const app= express();

app.use(cors());
app.use(express.json());

app.listen(3000,()=>{
    console.log("server is up and running on port 3000!!!")
});

app.use('/api/user',UserRoutes);
app.use('/api/auth',authRoutes);