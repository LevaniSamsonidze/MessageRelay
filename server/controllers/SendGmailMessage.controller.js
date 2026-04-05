const nodemailer = require("nodemailer");
const { AppError } = require("../utils/ErorrHendler");
const Message = require("../modules/Message.Schema");
const { User } = require("../modules/Users.Schema");


const SendGmailMessage = async (req, res) =>{
    const { userGmail, subject, text, id } = req.body;

    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    const gmailOption = {
        from: process.env.USER,
        to: userGmail,
        subject: subject,
        text: text
    };
    const user = await User.findOne({id: req.user.id});

    transpoter.sendMail(gmailOption)
        .then(() =>{
            const gmail = user 
            const newMessage = new Message({
                messageId: id,
                userId: req.user.id,
                clientGmail: user.gmail,
                userGmail: userGmail,
                subject: subject,
                text: text
            })

            newMessage.save()
            res.status(200).json({message: "A message has been sent to the Gmail", ok: true })
        }).catch(() =>{
            const err = new AppError("The message was not sent on Gmail", 401);
            res.status(err.statusCode).json(err.errorMessage)
        })
        
}

module.exports = SendGmailMessage;