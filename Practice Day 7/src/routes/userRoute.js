import express from "express";
import { createUser } from "../controllers/userControllers.js";

const userRouter=express.Router();

userRouter.post("/register",createUser);

export default router