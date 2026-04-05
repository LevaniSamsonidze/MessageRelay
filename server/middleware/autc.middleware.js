const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/ErorrHendler");

const autcStore = (req, res, next) =>{
    const authHeader = req.headers.autc;
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.TOKEN)
        req.user = decoded;
        next();
    }catch(err){
        next(new AppError("token not valid", 400))
    }

}
module.exports = autcStore;