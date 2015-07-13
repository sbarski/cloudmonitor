(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LogoutController', ['$scope', '$location', 'logger', 'auth', function($scope, $location, logger, auth) {
        $scope.logout = function(){
            auth.signout();
            store.remove('profile');
            store.remove('token');
        }
    }
  ])
})();

