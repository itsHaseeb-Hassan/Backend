import User from "../models/userModel.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
const createUser=async(req,res,next )=>{
    const {name,email,password}=req.body
// validation
    try {
        if(!name || !email || !password){
         const error=createHttpError(400,"All fields are required")
         return next(res.json(error))
        }
    } catch (error) {
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }

    // check if user exists

    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            const error=createHttpError(409,"User already exists")
            return next(res.json(error))
        }
    } catch (error) {
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }
    // hash password
    const hashpassword=await bcrypt.hash(password,10)
    // create user
    let newUser;
    try {
        newUser=await User.create({name,email,password:hashpassword})
    } catch (error) {
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }

    // generate token
    try {
        const token=Jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'},{algorithm:'HS256'})
       res.status(201).json({accessToken:token})    
    } 
    
    catch (error) {
        const err=createHttpError(500,"token generation failed")
        return next(res.json(err))
    }
}
export {createUser}

// loginUser

export const loginUser=async(req,res,next)=>{
    const {email,password}=req.body;

    // validation
    try {
        if(!email || !password){
            const error=createHttpError(400,"All fields are required")
            return next(res.json(error))
    }
    } catch (error) {
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }

    // check if user exists
    let existingUser;
    try{
         existingUser=await User.findOne({email})
        if(!existingUser){
            const error=createHttpError(404,"User not found")
            return next(res.json(error))
        }
    }catch(error){
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }

    // compare password
    try {
        const isMatch=await bcrypt.compare(password,existingUser.password)
        if(!isMatch){
            const error=createHttpError(401,"Invalid credentials")  
            return next(res.json(error))    
        }
    } catch (error) {
        const err=createHttpError(500,'Intrnal server error')
        return next(res.json(err))
    }
    // token generation
    try {
        const token=Jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1d'},{algorithm:'HS256'})
        res.status(200).json({accessToken:token})
    } catch (error) {
        const err=createHttpError(500,"token generation failed")
        return next(res.json(err))
    }
}