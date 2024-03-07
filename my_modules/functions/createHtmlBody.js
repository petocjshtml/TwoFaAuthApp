const moment = require("moment");

function createHtmlBody(valid_until_ts, code) {
   const expirationDate = moment(Number(valid_until_ts)).format("DD.MM.YYYY HH:mm:ss");
   const htmlContent = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                     body { font-family: Arial, sans-serif; font-size: 16px; color: #333333; background-color: #F4F4F4; padding: 20px; }
                    .email-container { background-color: #FFFFFF; width: 80%; margin: auto; padding-top: 20px; }
                    .header { color: #4A90E2; font-size: 24px; text-align: center; margin-bottom: 15px; }
                    .content { margin-bottom: 5px; padding: 15px; text-align: center; }
                    .footer { font-size: 12px; text-align: center; color: #999999; padding:15px; }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">Ringier Axel Verification Code</div>
                    <div class="content">
                        Please, enter this verification code on your other device to sign in.
                        <br><br>
                        <strong>Code:</strong> ${code}
                        <br><br>
                        This code will expire ${expirationDate}
                    </div>
                    <div class="footer">
                    Please confirm your identity.
                    </div>
                </div>
            </body>
            </html>`;
   return htmlContent;
}

module.exports = createHtmlBody;
