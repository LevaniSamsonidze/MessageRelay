const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, requierd: true, default: 'user'},
    proflePhoto: {type: String, default: 'https://via.placeholder.com/40'},
    logged: {type: String, default: false}
});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User,
    UserSchema
};