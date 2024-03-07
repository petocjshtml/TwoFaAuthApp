function createUserObj(form_obj) {
   let user = {
      email: form_obj.email,
      password: form_obj.password,
   };
   return user;
}

module.exports = createUserObj;
