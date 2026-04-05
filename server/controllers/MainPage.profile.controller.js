const { User } = require("../modules/Users.Schema");

const MainPageProfile = async (req, res) =>{
    const {id} = req.body;
    const user = await User.findOne({id})
    res.json(user)
}

module.exports = MainPageProfile;