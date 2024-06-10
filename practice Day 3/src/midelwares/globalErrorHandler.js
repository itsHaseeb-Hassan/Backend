const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}
export default globalErrorHandler