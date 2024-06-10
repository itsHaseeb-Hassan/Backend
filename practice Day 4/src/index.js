import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db/db.js'

const app=express()
dotenv.config()

app.use(express.json())

const PORT=process.env.PORT || 8001

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log(`Error:${error.message}`)
})

