const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
   email: String,
   login_success: Boolean,
   device: {},
   browser: {},
   os: {},
   ip: String,
   country_iso_code: String,
   city: String,
   time: Number,
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
