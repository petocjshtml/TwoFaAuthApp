// Importovanie modelu User
const User = require("../models/User");

class UserController {
   // Metóda na vloženie nového používateľa
   constructor() {}

   async insertUser(userObj) {
      try {
         const { email, password } = userObj;
         const newUser = new User({ email, password });
         const savedUser = await newUser.save();
         console.log("Inserted User.");
         return savedUser;
      } catch (error) {
         throw new Error(`Chyba pri vkladaní používateľa: ${error.message}`);
      }
   }

   // Metóda na vyhľadanie používateľa podľa emailu
   async selectUserByEmail(email) {
      try {
         const user = await User.findOne({ email });
         return user;
      } catch (error) {
         throw new Error(`Chyba pri vyhľadávaní používateľa: ${error.message}`);
      }
   }

   // Metóda na odstránenie používateľa podľa emailu
   async deleteUserByEmail(email) {
      try {
         const deletedUser = await User.findOneAndDelete({ email });
         return deletedUser;
      } catch (error) {
         throw new Error(`Chyba pri odstraňovaní používateľa: ${error.message}`);
      }
   }

   // Metóda na odstránenie všetkých používateľov
   async deleteAllUsers() {
      try {
         const deletedUsers = await User.deleteMany({});
         return deletedUsers;
      } catch (error) {
         throw new Error(`Chyba pri odstraňovaní všetkých používateľov: ${error.message}`);
      }
   }

   // Metóda na aktualizáciu používateľa podľa emailu
   async updateUserByEmail(email, newPassword) {
      try {
         const updatedUser = await User.findOneAndUpdate({ email }, { password: newPassword }, { new: true });
         return updatedUser;
      } catch (error) {
         throw new Error(`Chyba pri aktualizácii používateľa: ${error.message}`);
      }
   }

   //Kontroluje, či je v databáse user s rovnakým menom a heslom
   async checkUser(userObj) {
      try {
         const { email, password } = userObj;
         const user = await User.findOne({ email, password });
         return !!user; // Vráti true, ak user existuje, inak false
      } catch (error) {
         throw new Error(`Chyba pri overovaní používateľa: ${error.message}`);
      }
   }
}

module.exports = UserController;
