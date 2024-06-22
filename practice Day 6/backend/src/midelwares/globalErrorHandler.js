const globalErrorHandler=async(err,req,res,next)=>{
    res.status(err.statusCode).json({
        status:"error",
        message:err.message
    })
}
export default globalErrorHandler