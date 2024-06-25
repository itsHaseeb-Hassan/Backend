import express from 'express'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv'

dotenv.config()

const app=express()
app.use(express.json())