const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
   email: String,
   code: String,
   device: {},
   browser: {},
   os: {},
   ip: String,
   country_iso_code: String,
   city: String,
   valid_until_time: String,
   verified: Boolean,
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
