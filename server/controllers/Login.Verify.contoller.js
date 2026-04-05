const { getCode } = require("../utils/tempStore");

const LoginVerify = (req, res) => {
    const { code } = req.body;
    const savedCode = getCode(); 

    if (!code || !savedCode) {
        return res.status(400).json({ message: 'The code does not exist' });
    }
    
    if (parseInt(code) === savedCode) {
        return res.status(200).json({
            ok: true,
            message: 'Verification successful!' 
        });
    } else {
        return res.status(400).json({ 
            ok: false,
            message: 'Incorrect code' 
        });
    }
}

module.exports = LoginVerify;