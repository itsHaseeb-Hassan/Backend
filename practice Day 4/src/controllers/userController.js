import createHttpError from "http-errors"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
export const createUser=async(req,res,next)=>{
   const {name,email,password}=req.body

//    validation
if(!name || !email || !password){
    const error=createHttpError(400,'All Fields Are Required')
    next(error)
}

// email checking in database
try {
    const user=await User.findOne({email});
    if(user){
        const error=createHttpError(400,'Email Already Exist')
        next(error)
    }
} catch (error) {
    return next(createHttpError(500,'Error While Finding User'))
}

// password hashing
  const hashedPassword=await bcrypt.hash(password,10)
  let newUser
  try {
    newUser= await User.create({name,email,password:hashedPassword})
  } catch (error) {
      return next(createHttpError(500,'Error While User Creating'))
  }

  res.status(201).json({user:newUser})
}
