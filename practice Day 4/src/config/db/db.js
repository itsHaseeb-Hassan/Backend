import mongoose from 'mongoose'

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTology:true,
            useNewUrlParser:true
        })
        console.log(`Connect Mongo Db: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}