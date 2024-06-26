import mongoose from 'mongoose'

export const conectDB= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}