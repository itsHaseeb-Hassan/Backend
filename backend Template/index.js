import express from 'express'
import dotenv from 'dotenv'
import conectDB from './db/index.js'

dotenv.config()

const app=express()

app.use(express.json())

conectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Running on Port ${PORT}`)
    })
}).catch((error)=>{
    console.log(`Error:${error.message}`)
})