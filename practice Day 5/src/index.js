import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db/index.js'
import userRouter from './routes/userRoute.js'


const app=express()

dotenv.config()


// middelware
app.use(express.json())

// routes
app.use("/api/v1",userRouter)


const PORT=process.env.PORT || 8001

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log(`Error is:${error.message}`)
})