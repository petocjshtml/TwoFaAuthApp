const nodemailer = require("nodemailer");
const createHtmlBody = require("../functions/createHtmlBody");
require("dotenv").config();

class EmailSender {
   constructor() {
      this.config = {
         sender_email: process.env.SENDER_EMAIL,
         sender_app_password: process.env.SENDER_PASSWORD,
      };

      this.transporter = nodemailer.createTransport({
         service: "gmail",
         host: "smtp.gmail.com",
         port: 587,
         secure: false, // Use `true` for port 465, `false` for all other ports
         auth: {
            user: this.config.sender_email,
            pass: this.config.sender_app_password,
         },
      });
   }

   async sendMail(verification_code, valid_until_ts, email_prijemcu) {
      const htmlContent = createHtmlBody(valid_until_ts, verification_code);
      var mail_setup = {
         from: {
            name: "Ringier Axel",
            address: this.config.sender_email,
         },
         to: [email_prijemcu], // list of receivers
         subject: "Overovací kód: " + verification_code, // Subject line
         text: "", // plain text body
         html: htmlContent,
      };
      try {
         await this.transporter.sendMail(mail_setup);
         console.log("Email has been sent!");
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = EmailSender;
