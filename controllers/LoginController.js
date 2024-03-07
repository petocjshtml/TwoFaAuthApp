// Importovanie modelu Login
const Login = require("../models/Login");

class LoginController {
   constructor() {}

   // Metóda na vloženie nového záznamu o prihlásení
   async insertLogin(loginData) {
      try {
         const newLogin = new Login(loginData);
         const savedLogin = await newLogin.save();
         return savedLogin;
      } catch (error) {
         throw new Error(`Chyba pri vkladaní záznamu o prihlásení: ${error.message}`);
      }
   }

   // Metóda na vyhľadanie záznamu o prihlásení podľa emailu
   async selectLoginByEmail(email) {
      try {
         const login = await Login.findOne({ email });
         return login;
      } catch (error) {
         throw new Error(`Chyba pri vyhľadávaní záznamu o prihlásení: ${error.message}`);
      }
   }

   // Metóda na odstránenie záznamu o prihlásení podľa emailu
   async deleteLoginByEmail(email) {
      try {
         const deletedLogin = await Login.findOneAndDelete({ email });
         return deletedLogin;
      } catch (error) {
         throw new Error(`Chyba pri odstraňovaní záznamu o prihlásení: ${error.message}`);
      }
   }

   // Metóda na odstránenie všetkých záznamov o prihlásení
   async deleteAllLogins() {
      try {
         const deletedLogins = await Login.deleteMany({});
         return deletedLogins;
      } catch (error) {
         throw new Error(`Chyba pri odstraňovaní všetkých záznamov o prihlásení: ${error.message}`);
      }
   }

   // Metóda na aktualizáciu záznamu o prihlásení podľa emailu
   async updateLoginByEmail(email, newData) {
      try {
         const updatedLogin = await Login.findOneAndUpdate({ email }, newData, {
            new: true,
         });
         return updatedLogin;
      } catch (error) {
         throw new Error(`Chyba pri aktualizácii záznamu o prihlásení: ${error.message}`);
      }
   }

   // Metóda na vyhľadanie všetkých záznamov o prihlásení podľa emailovej adresy
   async selectAllLoginsByEmailAddress(email) {
      try {
         const logins = await Login.find({ email });
         return logins;
      } catch (error) {
         throw new Error(`Chyba pri vyhľadávaní záznamov o prihlásení podľa emailu: ${error.message}`);
      }
   }

   // Metóda na vyhľadanie záznamu o prihlásení podľa emailu a času
   async selectLoginByEmailAndTime(email, time) {
      try {
         const login = await Login.findOne({
            email,
            time,
         });
         return login;
      } catch (error) {
         throw new Error(`Chyba pri vyhľadávaní záznamu o prihlásení podľa emailu a času: ${error.message}`);
      }
   }
}

module.exports = LoginController;
