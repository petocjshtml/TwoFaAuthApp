const crypto = require("crypto");
const FormatLogin = require("../classes/FormatLogin");
const fs = require("fs");
const Reader = require("@maxmind/geoip2-node").Reader;
const path = require("path");

async function checkObject(req) {
   const dbPath = path.join(__dirname, "./db/database.mmdb");
   const dbBuffer = fs.readFileSync(dbPath);
   const reader = Reader.openBuffer(dbBuffer);
   const formData = req.body;

   formData.password = crypto.createHash("md5").update(formData.password).digest("hex");

   // ip simulation
   let ipAddresses = ['213.81.233.163', '87.244.236.30', '147.232.200.10'];
   const randomIpIndex = Math.floor(Math.random() * ipAddresses.length);
   let ipAddress = ipAddresses[randomIpIndex];
   ipAddress = ['213.81.233.163', '87.244.236.30', '147.232.200.10'];
   //ipAddress = req.ip.replace("::ffff:",""); 
   formData.ip = ipAddress;

   try {
      const ipStatsFromDatabase = await reader.city(ipAddress);
      formData.country_iso_code = ipStatsFromDatabase.country.isoCode;
      formData.city = ipStatsFromDatabase.city.names.en;
   } catch (error) {
      console.error(error.message);
   }
   return new FormatLogin(formData, ipAddress).format();
}

module.exports = checkObject;
