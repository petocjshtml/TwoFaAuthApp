function createTokenObj(form_obj) {
   let token = {
      email: form_obj.email,
      code: Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, "0"),
      device: form_obj.device,
      browser: form_obj.browser,
      os: form_obj.os,
      ip: form_obj.ip,
      country_iso_code: form_obj.country_iso_code,
      city: form_obj.city,
      // Pridá 2 minúty (120000 milisekúnd) k aktuálnemu času ako čas, dokedy je token platný
      valid_until_time: Date.now() + 120000,
      verified: false,
   };
   return token;
}

module.exports = createTokenObj;
