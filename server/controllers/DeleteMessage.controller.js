const Message = require("../modules/Message.Schema");

const DeleteMessage = async (req, res) =>{
    const { id } = req.params;
    
    const message = await Message.findOneAndDelete({messageId: id});

    res.status(200).json({message: "message delete", ok: true})
    
}

module.exports = DeleteMessage;