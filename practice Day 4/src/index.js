import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db/db.js'
import userRouter from './routes/userRouter.js'

const app=express()
dotenv.config()

// app.use(midelwares)
app.use(express.json())

// routes
app.use("/api/user",userRouter)


const PORT=process.env.PORT || 8001

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log(`Error:${error.message}`)
})

