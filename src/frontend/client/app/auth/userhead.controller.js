(function () {
  angular
  .module('app.auth')
  .controller('userHeaderController', ['$scope', 'UserService', 'auth', function($scope, UserService, auth) {
        
        if (UserService.isAuthenticated()){
            $scope.firstname = auth.profile.nickname;
        }
    }
  ])
})();