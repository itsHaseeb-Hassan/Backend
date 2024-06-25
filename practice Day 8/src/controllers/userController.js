import User from "../models/userModel.js";
import createHttpError from "http-errors";
const createUser=(req,res,next )=>{
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
}