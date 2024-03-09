# TwoFaAuthApp
An application that determines when a user should be verified at login.
# Firstly install the dependencies:
```bash
git clone https://github.com/petocjshtml/TwoFaAuthApp.git
```
```bash
cd TwoFaAuthApp
```
```bash
npm install
```
# After that, config the application.
Now you need to configure your email credentials for your app so that the app knows which email address to send verification emails from.
To get a password for the app, you'll need to set up 2-step authentication in your gmail settings and generate an app password.
Please set the following data as an environment variables.
```bash
echo SENDER_EMAIL = ENTER_YOUR_SENDER_EMAIL_ADDRESS_HERE > .env
```
```bash
echo SENDER_PASSWORD = ENTER_YOUR_SENDER_APP_PASSWORD_HERE >> .env
```
You also need a working connection to mongo database for the application to work properly.
```bash
echo DB_CONNECTION = ENTER_YOUR_MONGO_DB_CONNECTION_STRING_HERE >> .env
```
In mongoDB you can set up for the app:
 - dbname: "2fa_db"
 - collection 1: "users"
 - collection 2: "tokens"
 - collection 3: "logins"
# (Note: ip address is simulated)

Obtaining the client's ip address is simulated, as this is not possible in local testing. However, when the application is produced and loaded on the server, to get the real ip address of the client, simply uncomment line 20 in this file:

[checkObject.js](https://github.com/petocjshtml/TwoFaAuthApp/blob/main/my_modules/functions/checkObject.js)
# Start the application:
Use this simple command to start the application:
```bash
npm start
```
If you are testing the app locally, you can try visiting this link after launching it to see how it works:<br>

http://localhost:3000/register

The app also runs online on the server, so you can test it under this link:<br>

http://167.71.131.68:3000/register
