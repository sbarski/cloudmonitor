(function () {
  'use strict';

  angular
  .module('app.auth')
  .controller('LoginController', ['$scope', '$location', 'logger', 'auth', 'aiStorage', 'ENV', 
    function($scope, $location, logger, auth, store, ENV) {
       $scope.login = function () {
        auth.signin({}, function (profile, token) {
          // Success callback
          debugger;
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/dashboard');
        }, function (data) {
          logger.logError(data);
        });
      }

      $scope.signup = function () {
        auth.signup({}, function (profile, token) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/dashboard');
        }, function (data) {
          logger.logError(data);
        });
      }

      $scope.reset = function () {
        auth.reset({}, function (profile, token) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/');
        }, function (data) {
          logger.logError(data);
        });
      }
    }
  ])
})();