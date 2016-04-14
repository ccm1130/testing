// var Global = (function() {
//   var token = '';

//   // function privateMethod () {
//   //   // ...
//   // }

//   return { // public interface
//     getToken: function () {
//       return token;
//     },

//     setToken: function (t) {
//     	token = t;
//     },

//     setCookie: function(key, value) {
//         var expires = new Date();
//         expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
//         document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
//     },

//     getCookie: function(key) {
//         var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
//         return keyValue ? keyValue[2] : null;
//     }


//   };
// })();

var $ = require('jquery');


var SingletonClass = (function(){
    function SingletonClass() {
      //do stuff
      var token = null;
      var user = null; 
      var loggedIn = false;

      return {
        KEY: 'mykey',
        //KEY: 'ZGWsfubPGEW412QmVe5H0w==',
        //TOKEN: 'FgxadxMKEwZdPPv8tLHDQA',
        USER: 'uh5XLMt2xwoTsBrew3wt9g',
       
        getUser: function() {
          console.log('getUser', user, loggedIn);
          if (loggedIn) {
            //if (typeof user === 'undefined')
            //  user = {_id:null, username:null};
              
            //if (Object.keys(user).length <= 0)
            if (user === null)
              user = JSON.parse(this.getCookie(this.USER));

            return user;
          }
          else 
            return {_id:null, username:null};
        },

        /*setToken: function (t) {
         token = t;
        },

        getToken: function () {
          if (token === null)
            token = this.getCookie(this.TOKEN);

          return token;
        },*/

        setLoggedIn: function(value) {
          loggedIn = value;

          if (value === true)
            this.getUser(); 
        },

        isLoggedIn: function() {
          return loggedIn;
        },

        checkLoggedIn: function(callback) {
          
          if (typeof window === 'undefined')
            return; 

          var me = this;

          /*$.post( "/api/logged-in", {})
            .done(function(data) { 
              console.log('set logged in true');
              me.setLoggedIn(true);
              if (callback)
                callback(true);
            })
            .fail(function(){
              me.setLoggedIn(false);
              if (callback)
                callback(false);
            });*/

          $.ajax({
            url: '/api/logged-in',
            type: 'post',
            async: false,
            success: function(res, status, xhr) {
              me.setLoggedIn(true);
              if (callback)
                callback(true);              
            },
            error: function(xhr, status, err) {
              me.setLoggedIn(false);
              if (callback)
                callback(false);
            }
          });
        },

        login: function(data, callback) {
          var me = this;

          $.ajax({
              url: '/api/login',
              type: 'post',
              data: data,          
              dataType: 'json',
              success: function (res, status, xhr) {               
                if (res.msg === 'success') {
                  var token = xhr.getResponseHeader("Authorization")
                  user = { 
                            _id: res.data._id,
                            username: res.data.username
                          }
                  me.setLoggedIn(true);
                  //me.setToken(token);
                  //me.setCookie(me.TOKEN, token, 24);                  
                  me.setCookie(me.USER, JSON.stringify(user), 24);
                }
                callback(res, status, xhr);
              }
          }); 
        },

        logout: function(callback) {
          console.log('logout');
          var me = this;
          token = null;
          user = null;
          this.setCookie(this.TOKEN, null, -99);
          this.setCookie(this.USER, null, -99);

          $.get( "/api/logout", {})
            .done(function(data) {              
              me.setLoggedIn(false);
              callback();
            });          
        },

        setCookie: function(key, value, duration) {
          var expires = new Date();

          if (typeof window !== 'undefined') {
            //console.log('setCookie');
            expires.setTime(expires.getTime() + duration * 60 * 60 * 1000);
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
          }
        },

        getCookie: function(key) {
          var keyValue;

          if (typeof window !== 'undefined') {
            //console.log('getCookie');
            keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');        
          }

          return keyValue ? keyValue[2] : null;
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
	