const Message = require("../modules/Message.Schema");
const { User } = require("../modules/Users.Schema");

const AdminPage = async (req, res) =>{
    const id = req.user.id;
    const user = await User.findOne({ id: id });
    const users = await Message.find();

    if(user && users){
        res.status(201).json({userRole: user.role, users: users})
    }
}

module.exports = AdminPage;