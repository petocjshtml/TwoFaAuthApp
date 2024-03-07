function checkAuth(login, database) {
   const loginKeys = Object.keys(login).filter((key) => key !== "time");
   return loginKeys.every((key) => {
      const val1 = login[key];
      const val2 = database[key];
      return typeof val1 === "object" && val1 !== null && typeof val2 === "object" && val2 !== null ? checkAuth(val1, val2) : val1 === val2;
   });
}

module.exports = checkAuth;
