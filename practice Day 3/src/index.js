import express from 'express'
import dotenv from 'dotenv'
import { conectDB } from './db/index.js'


dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

conectDB().then(()=>{   
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
}).catch((error)=>{
    console.error('Connection to MongoDB failed:', error.message);
})

