import express from 'express'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv'
import connectDB from './config/db/db.js'
import { globalHandler } from './middelwares/globalHandler.js'

dotenv.config()

const app=express()
app.use(express.json())
app.use(globalHandler)

app.use('/api/users',userRouter)

const PORT=process.env.PORT || 5000

connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
}).catch(()=>{
    console.log(`Error: ${error.message}`)
})