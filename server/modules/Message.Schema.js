const mongoose = require("mongoose");

const MessageScema = new mongoose.Schema({
    messageId: {type: String, required: true},
    userId: {type: String, required: true},
    clientGmail: {type: String, required: true},
    userGmail: {type: String, required: true},
    subject: {type: String, required: true},
    text: {type: String, required: true}
})

const Message = mongoose.model("MessageSend", MessageScema);

module.exports = Message;