const { User } = require("../modules/Users.Schema");

const ResetPassword = async (req, res) =>{
    const { newPassword, gmail } = req.body;
    const user = await User.findOne({ gmail })
    user.password = newPassword;
    await user.save()
    res.status(202).json({message: 'password restart'})
}

module.exports = ResetPassword;