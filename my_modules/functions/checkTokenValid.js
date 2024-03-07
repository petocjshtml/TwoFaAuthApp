function checkTokenValid(token) {
   const currentTime = Date.now();
   const validUntilTime = parseInt(token.valid_until_time, 10);
   return validUntilTime > currentTime;
}
module.exports = checkTokenValid;
