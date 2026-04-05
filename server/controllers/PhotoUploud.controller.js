const { User } = require("../modules/Users.Schema");

const PhotoUploud = async (req, res) =>{
    const id = req.user.id;
    const user = await User.findOne({id});
    user.proflePhoto = req.body.photo;
    await user.save()
    console.log(user)
}

module.exports = PhotoUploud;