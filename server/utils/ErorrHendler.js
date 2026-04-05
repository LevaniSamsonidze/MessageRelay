class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.errorMessage = message;  
        this.statusCode = statusCode; 
    }
}

const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        statusCode: statusCode,
        errorMessage: err.message || "Internal Server Error"
    });
};


module.exports = { AppError, ErrorHandler };