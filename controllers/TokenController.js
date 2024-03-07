const Token = require("../models/Token"); // Importovanie modelu Token

class TokenController {
   constructor() {}

   // Metóda na vloženie nového tokenu
   async insertToken(tokenData) {
      try {
         const newToken = new Token(tokenData);
         const savedToken = await newToken.save();
         return savedToken;
      } catch (error) {
         throw new Error(`Chyba pri vkladaní tokenu: ${error.message}`);
      }
   }

   async confirmToken(code, email) {
      try {
         const updatedToken = await Token.findOneAndUpdate({ email, code }, { $set: { verified: true } }, { new: true });
         return updatedToken;
      } catch (error) {
         throw new Error(`Error verifying token: ${error.message}`);
      }
   }

   async selectTokenByDetails(tokenDetails) {
      try {
         const { email, device, browser, os, ip, country_iso_code, city } = tokenDetails;
         const token = await Token.findOne({
            email,
            "device.model": device.model,
            "device.type": device.type,
            "device.vendor": device.vendor,
            "browser.name": browser.name,
            "browser.version": browser.version,
            "browser.major": browser.major,
            "os.name": os.name,
            "os.version": os.version,
            ip,
            country_iso_code,
            city,
         });
         return token;
      } catch (error) {
         throw new Error(`Chyba pri vyhľadávaní tokenu: ${error.message}`);
      }
   }

   // Metóda na vyhľadávanie tokenu podľa kódu a emailu
   async selectTokenByCodeAndEmail(code, email) {
      try {
         const token = await Token.findOne({ code, email });
         return token;
      } catch (error) {
         throw new Error(`Error finding token by code and email: ${error.message}`);
      }
   }

   async deleteTokenByDetails(tokenDetails) {
      try {
         const { email, device, browser, os, ip, country_iso_code, city } = tokenDetails;
         const deletionResult = await Token.deleteOne({
            email,
            "device.model": device.model,
            "device.type": device.type,
            "device.vendor": device.vendor,
            "browser.name": browser.name,
            "browser.version": browser.version,
            "browser.major": browser.major,
            "os.name": os.name,
            "os.version": os.version,
            ip,
            country_iso_code,
            city,
         });

         if (deletionResult.deletedCount === 0) {
            throw new Error("Token nebol nájdený alebo už bol vymazaný.");
         }

         return { success: true, message: "Token bol úspešne vymazaný." };
      } catch (error) {
         throw new Error(`Chyba pri vymazávaní tokenu: ${error.message}`);
      }
   }
}

module.exports = TokenController;
