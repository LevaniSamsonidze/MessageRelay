const { User } = require("../modules/Users.Schema");
const { AppError } = require("../utils/ErorrHendler");
const nodeMailer = require("nodemailer");
const { saveCode } = require("../utils/tempStore");
const jwt = require("jsonwebtoken")

const Login = async (req, res, next) =>{
    const { gmail, password } = req.body;
    const user = await User.findOne({ gmail, password });
    if (!user){
        const err = new AppError('The password or email is incorrect', 404);
        return res.status(err.statusCode).json(err.errorMessage, {ok: false})
    }else{
        try{
            const RandomCode = Math.floor(1000 + Math.random() * 9000);
            saveCode(RandomCode, 60000)
            const sendGmail = nodeMailer.createTransport({
                service: "gmail",
                auth:{
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            })
            const gmailOption = {
                from: process.env.USER,
                to: gmail,
                subject: 'MessageRelay',
                text: RandomCode.toString()
            }
            await sendGmail.sendMail(gmailOption)
            const tokenUser = jwt.sign({id: user.id}, process.env.TOKEN, {expiresIn: "3d"})
            res.status(201).json({message: 'letsgoo', tokenUser})
        }catch(err){
            return res.status(500).json({ message: "Failed to send email", error: err.message });
        }
    }
    
}

module.exports = Login;