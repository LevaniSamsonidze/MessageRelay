const { User } = require("../modules/Users.Schema");

const PhotoUploud = async (req, res) =>{
    const id = req.user.id;
    const user = await User.findOne({id});
    user.proflePhoto = req.body.photo;
    await user.save()
    res.status(201).json({message: "Please wait, the photo will upload soon, restart the site"})
}

module.exports = PhotoUploud;