"use strict";

var CryptoJS = require('crypto-js');
var Global = require('./global').getInstance();

var SingletonClass = (function(){
    function SingletonClass() {
      var key = Global.KEY;

      return {
        
        hashPassword: function(pwd) {
          return CryptoJS.enc.Base64.stringify(CryptoJS.HmacMD5(pwd, key));
        }

      }
    }
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new SingletonClass();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
   };
})();


module.exports = SingletonClass;
	