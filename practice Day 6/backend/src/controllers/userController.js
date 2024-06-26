import User from "../models/userModel.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(
      400,
      "Please provide name, email, and password"
    );
    return next(error);
  }

  // Check if user exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = createHttpError(409, "User already exists");
      return next(error);
    }
  } catch (error) {
    console.error("Error while finding the user: ", error);
    const fetchError = createHttpError(500, "Error while finding the user");
    return next(fetchError);
  }

  // Password hashing
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Hashing error: ", error);
    const hashError = createHttpError(500, "Error while hashing the password");
    return next(hashError);
  }

  // Create new user
  let newUser;
  try {
    newUser = await User.create({ name, email, password: hashedPassword });
  } catch (error) {
    console.error("Error while creating the user: ", error); // Log the detailed error
    const createError = createHttpError(500, "Error while creating the user");
    return next(createError);
  }

  // jwt token
  try {
    
      const token = jwt.sign(
        {  id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        {algorithm: "HS256"}
    );
    res.status(201).json({ accessToken: token });
  } catch (error) {
    const tokenError = createHttpError(500, "Error while creating the token");
    return next(tokenError);
  }

};

export default createUser;


export const loginUser=async(req,res,next)=>{
   const {email,password}=req.body;

   if(!email || !password){
    const error=createHttpError(400,"Please provide email and password");
    return next(error);
   }  

   const existingUser=await User.findOne({email});

   if(!existingUser){
    const error=createHttpError(401,"Invalid credentials");
    return next(error);
   }

   const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
   if(!isPasswordCorrect){
    const error=createHttpError(401,"Invalid credentials");
    return next(error);
   }

   const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
   res.status(200).json({accessToken:token});

}