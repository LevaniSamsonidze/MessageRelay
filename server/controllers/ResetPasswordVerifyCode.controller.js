const nodeMailer = require("nodemailer");
const { User } = require("../modules/Users.Schema");
const { AppError } = require("../utils/ErorrHendler");


const ResetPasswordVerifyCode = async (req, res) =>{
    const { gmail } = req.body;
    const userGmail = await User.findOne({gmail})
    if(!userGmail){
        const err = new AppError(`not found the ${gmail} gmail in MessgeRelay Website`, 404)
        res.status(err.statusCode).json(err.errorMessage, {ok: false})
        return;
    }
    const randomCodeResetPassword = Math.floor(1000 + Math.random() * 9000);
    const transpoter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })
    const gmailOption = {
        from: process.env.USER,
        to: gmail,
        subject: 'Password Reset Code',
        text: randomCodeResetPassword.toString()
    }
    await transpoter.sendMail(gmailOption)
    res.status(201).json({message: "password reseted", ok:true, code: randomCodeResetPassword})
    
}

module.exports = ResetPasswordVerifyCode;