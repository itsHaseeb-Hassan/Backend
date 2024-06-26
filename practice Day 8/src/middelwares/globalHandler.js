// global handler
export const globalHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message
    const data=err.data
    res.status(statusCode).json({
        status:'fail',
        message,
        data
    })
}