const express = require("express");
const SignUp = require("../controllers/SignUp.controler");
const Login = require("../controllers/Login.controller");
const LoginVerify = require("../controllers/Login.Verify.contoller");
const autcStore = require("../middleware/autc.middleware");
const MainPageProfile = require("../controllers/mainPage.profile.controller");
const PhotoUploud = require("../controllers/photoUploud.controller");
const ResetPasswordVerifyCode = require("../controllers/ResetPasswordVerifyCode.controller");
const ResetPassword = require("../controllers/ResetPassword.controller");
const SendGmailMessage = require("../controllers/SendGmailMessage.controller");
const AdminPage = require("../controllers/AdminPage.controller");
const DeleteMessage = require("../controllers/DeleteMessage.controller");

const appRouter = express.Router();

appRouter.post("/signup", SignUp);
appRouter.post("/login", Login)
appRouter.post("/login/verify", LoginVerify);
appRouter.get("/mainpage", autcStore, (req, res) =>{
    res.json(req.user)
})
appRouter.post("/profile", MainPageProfile)
appRouter.get("/tokencheck", autcStore, (req, res) =>{
    res.json(req.user)
})
appRouter.patch("/uploadphoto", autcStore, PhotoUploud);
appRouter.post("/resetpassword", ResetPasswordVerifyCode)
appRouter.patch("/resetpassword", ResetPassword);
appRouter.post("/sendgmail", autcStore, SendGmailMessage);
appRouter.get("/adminpage", autcStore, AdminPage);
appRouter.delete("/adminpage/:id", DeleteMessage);


module.exports = appRouter;