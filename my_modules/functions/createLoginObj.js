function createLoginObj(form_obj, is_login_success) {
   let login = {
      email: form_obj.email,
      login_success: is_login_success,
      device: form_obj.device,
      browser: form_obj.browser,
      os: form_obj.os,
      ip: form_obj.ip,
      country_iso_code: form_obj.country_iso_code,
      city: form_obj.city,
      time: form_obj.time,
   };
   return login;
}

module.exports = createLoginObj;
