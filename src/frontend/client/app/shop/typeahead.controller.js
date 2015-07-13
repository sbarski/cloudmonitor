(function () {
	'use strict';

	angular
	.module('app.shop')
	.controller('TypeaheadCtrl', [
  '$scope', 'ShopService', function($scope, ShopService) {
    $scope.selected = void 0;

    $scope.$on('category-refresh', function(){
      ShopService.getCurrentCategories()
      .then(function(data){
        $scope.categories = data;
      })
    });
  }])
})();

