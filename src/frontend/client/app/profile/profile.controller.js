(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ['$rootScope', '$scope', '$location', 'logger', 'UserService', 'ShopService', '$http', 'aiStorage','ENV', function($rootScope, $scope, $location, logger, UserService, ShopService, $http, aiStorage, ENV) {
      $scope.user = UserService.getCurrentUser();

      if ($scope.user){
      	$scope.invoices = $scope.user.customer_details.AfdTaxInvoice;
      }

      $scope.modal = function(){
      	logger.log('This feature has not been implemented. Let me know if you want it.');
      }
    }
  ])
})();

