const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, requierd: true, default: 'user'},
    proflePhoto: {type: String, default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid&w=740&q=80'},
    logged: {type: String, default: false}
});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User,
    UserSchema
};