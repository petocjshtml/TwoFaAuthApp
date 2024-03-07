class FormatLogin {
   constructor(inputObject, ipAddress) {
      this.inputObject = inputObject;
      this.inputObject.ip = ipAddress;
   }

   ensureObjectAttributes(obj, defaultAttributes) {
      const result = { ...defaultAttributes };
      for (const key in defaultAttributes) {
         result[key] = obj.hasOwnProperty(key) ? obj[key] : "undefined";
      }
      return result;
   }

   format() {
      // Prednastavené hodnoty pre vnorené objekty
      const defaultDeviceAttributes = { model: "undefined", type: "undefined", vendor: "undefined" };
      const defaultBrowserAttributes = { name: "undefined", version: "undefined", major: "undefined" };
      const defaultOsAttributes = { name: "undefined", version: "undefined" };

      // Aplikovanie logiky pre všetky vnorené objekty
      this.inputObject.device = this.ensureObjectAttributes(this.inputObject.device || {}, defaultDeviceAttributes);
      this.inputObject.browser = this.ensureObjectAttributes(this.inputObject.browser || {}, defaultBrowserAttributes);
      this.inputObject.os = this.ensureObjectAttributes(this.inputObject.os || {}, defaultOsAttributes);

      // Doplnenie jednoduchých atribútov, ak chýbajú
      this.inputObject.time = this.inputObject.time || "undefined";
      this.inputObject.email = this.inputObject.email || "undefined";
      this.inputObject.password = this.inputObject.password || "undefined";
      this.inputObject.ip = this.inputObject.ip || "undefined";
      this.inputObject.country_iso_code = this.inputObject.country_iso_code || "undefined";
      this.inputObject.city = this.inputObject.city || "undefined";

      return this.inputObject;
   }
}

module.exports = FormatLogin;
