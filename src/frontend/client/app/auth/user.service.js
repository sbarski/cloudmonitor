(function () {
  'use strict';

  angular
  .module('app.auth')
  .factory('UserService', ['$rootScope', 'aiStorage', 'jwtHelper', 'auth', function($rootScope, store, jwtHelper, auth) {

        function getCurrentUser(){
            return null;
        }

        function isAuthenticated(){
            var token = store.get('token');

            if (token && !jwtHelper.isTokenExpired(token)) {
                if (!auth.isAuthenticated){
                    auth.authenticate(store.get('profile'), token);
                }

                return true;
            } else {
                return false;
            }
        }

        return {
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated
        }
    }
    ])
})();

