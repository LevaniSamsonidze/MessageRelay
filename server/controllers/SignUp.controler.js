const { User } = require("../modules/Users.Schema");
const { AppError } = require("../utils/ErorrHendler");

const SignUp = (req, res, next) => {
  const { id, gmail, pass } = req.body;
  const newUser = new User({
    id,
    gmail,
    password: pass
  });

  newUser.save()
    .then(() => {
        res.status(201).json({ message: "User created successfully" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const err = new AppError("A similar Gmail already exists", 404)
        return res.status(err.statusCode).json(err.message)
      }
      return res.status(500).json({ message: "Server error" });
    });
};


module.exports = SignUp;