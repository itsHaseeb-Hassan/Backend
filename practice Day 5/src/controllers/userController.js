import createHttpError from "http-errors"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
export const createUser=async(req,res,next)=>{
    // validation
    const{name,email,password}=req.body
    if(!name || !email || !password){
        const error=createHttpError(400,'All Field Requird')
        next(error)
    }

//   db check find one
try {
    const user=await User.findOne({email});
    if(user){
        const error=createHttpError(400,'Email Already Exist')
        next(error)
    }
} catch (error) {
    return(next(createHttpError(500,"Error while find the User")))
}

// password Hashing
const hashedPassword=await bcrypt.hash(password,10)
let newUser;
try {
    newUser=await User.create({name,email,password:hashedPassword})
} catch (error) {
    return(next(createHttpError(500,'Error while user Creating')))
}
res.status(201).json({user:newUser})
}