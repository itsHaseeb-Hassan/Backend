import mongoose from 'mongose'

const userSChema=new mongoose.schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    TimeStamps:true
})
const User=mongoose.model('User',userSChema)

export default User