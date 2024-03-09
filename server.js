const express = require("express");
const path = require("path");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const checkObject = require("./my_modules/functions/checkObject");
const createLoginObj = require("./my_modules/functions/createLoginObj");
const createUserObj = require("./my_modules/functions/createUserObj");
const createTokenObj = require("./my_modules/functions/createTokenObj");
const checkTokenValid = require("./my_modules/functions/checkTokenValid");
const UserContoller = require("./controllers/UserContoller");
const LoginController = require("./controllers/LoginController");
const TokenController = require("./controllers/TokenController");
const EmailSender = require("./my_modules/classes/EmailSender");
const user_controller = new UserContoller();
const login_controller = new LoginController();
const token_controller = new TokenController();
const email_sender = new EmailSender();
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

mongoose
   .connect(process.env.DB_CONNECTION)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/checkPage", async (req, res) => {
   let are_login_stats_valid = await login_controller.selectLoginByEmailAndTime(req.body.email, req.body.time);
   if (are_login_stats_valid) {
      await login_controller.setLoginSuccessByEmailAndTime(req.body.email, req.body.time);
      let user_logins = await login_controller.selectAllLoginsByEmailAddress(req.body.email);
      res.status(200).json({ message: "Login stats are valid !", logins: user_logins });
   } else {
      res.status(400).json({ message: "Login stats are invalid !" });
   }
});

app.post("/verifyUser", async (req, res) => {
   var token_in_db = await token_controller.selectTokenByCodeAndEmail(req.body.code, req.body.email);
   if (token_in_db) {
      if (checkTokenValid(token_in_db)) {
         res.status(200).json({ message: "Token is valid !" });
         await token_controller.confirmToken(req.body.code, req.body.email);
      } else {
         res.status(403).json({ message: "Token is invalid !" });
      }
   } else {
      res.status(400).json({ message: "Token is no exists!" });
   }
});

app.post("/loginUser", async (req, res) => {
   let form_obj = await checkObject(req);
   let is_user_exists = await user_controller.checkUser(createUserObj(form_obj));
   if (is_user_exists) {
      let token = createTokenObj(form_obj);
      let token_from_db = await token_controller.selectTokenByDetails(form_obj);
      if (token_from_db) {
         if (token_from_db.verified) {
            let success_login_obj = createLoginObj(form_obj, true);
            await login_controller.insertLogin(success_login_obj);
            res.status(200).json({ message: "Login succesfull !", email: success_login_obj.email, time: success_login_obj.time });
         } else {
            let failed_login_obj = createLoginObj(form_obj, false);
            res.status(404).json({ message: "Login is not verified - Redirect to Auth Page!", email: failed_login_obj.email, time: failed_login_obj.time });
            await token_controller.deleteTokenByDetails(form_obj);
            await token_controller.insertToken(token);
            await email_sender.sendMail(token.code, token.valid_until_time, token.email);
            await login_controller.insertLogin(failed_login_obj);
         }
      } else {
         let failed_login_obj = createLoginObj(form_obj, false);
         res.status(404).json({ message: "Login is not verified - Redirect to Auth Page!", email: form_obj.email, time: failed_login_obj.time });
         await token_controller.insertToken(token);
         await email_sender.sendMail(token.code, token.valid_until_time, token.email);
         await login_controller.insertLogin(failed_login_obj);
      }
   } else {
      let is_user_with_email_exists = await user_controller.selectUserByEmail(form_obj.email);
      if (is_user_with_email_exists) {
         res.status(401).json({ message: "Incorrect Credentials (Nesprávne heslo!) - Error message" });
      } else {
         res.status(403).json({ message: "User not exists - Redirect to Register!" });
      }
   }
});

app.post("/registerUser", async (req, res) => {
   let user_obj = req.body;
   let is_user_with_email_exists = await user_controller.selectUserByEmail(user_obj.email);
   if (is_user_with_email_exists) {
      res.status(409).json({ message: "User is already in the database!" });
   } else {
      user_obj.password = crypto.createHash("md5").update(user_obj.password).digest("hex"); //zahashovanie hesla
      let is_user_inserted = await user_controller.insertUser(user_obj);
      if (is_user_inserted) {
         res.status(200).json({ message: "Registration succesfull !" });
      }
   }
});

app.get("/login", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.get("/register", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/register.html"));
});

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/page.html"));
});

app.get("/auth", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/auth.html"));
});

app.listen(PORT, () => {
   console.log(`Server beží na porte ${PORT}`);
});
