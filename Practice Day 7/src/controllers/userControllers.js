import User from "../models/userModel.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const createUser=async(req,res)=>{
    const{name,email,password}=req.body;
// VALIDATION
    if(!name || !email || !password){
        throw createHttpError(400,"Please provide name, email and password");
    }

    // CHECK IF USER ALREADY EXISTS
    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            throw createHttpError(400,"User already exists");
        }
    } catch (error) {
        throw createHttpError(400,"User already exists");
    }
    // HASH PASSWORD
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    // CREATE NEW USER
    const newUser=new User({
        name,
        email,
        password:hashedPassword
    })
    try {
        const savedUser=await newUser.create();
        res.status(201).json(savedUser);
    } catch (error) {
        throw createHttpError(500,"Failed to create user");
    }
    // Jwt 

    try {
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token});
    } catch (error) {
        const tokenError= createHttpError(500,"Failed to create token");
        throw tokenError;
    }
}

export default createUser

    

