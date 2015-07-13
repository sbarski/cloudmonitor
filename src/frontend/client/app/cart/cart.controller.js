(function () {
	'use strict';

	angular
	.module('app.cart')
	.controller('CartController', ['$rootScope', '$scope', '$routeParams', '$location', 'logger', 'ShopService', '$http', '$modal', '$filter', 'lodash','ENV', function($rootScope, $scope, $routeParams, $location, logger, ShopService, $http, $modal, $filter, _, ENV) {
		var init;

		$scope.cart = ShopService.getCurrentCart();
		$scope.searchKeywords = '';
		$scope.filteredStores = [];
		$scope.row = '';

		$scope.addItem = function(productId){
			var count = ShopService.addItem(productId);
			$scope.cart = ShopService.getCurrentCart();

			logger.logSuccess('Another item added')

			$rootScope.$broadcast('cart-update', count);
		}

		$scope.removeItem = function(productId){
			var count = ShopService.removeItem(productId);
			$scope.cart = ShopService.getCurrentCart();

			logger.logSuccess('Item removed')

			$rootScope.$broadcast('cart-update', count);
		}

		$scope.removeProduct = function(productId){
			var count = ShopService.removeProduct(productId);
			$scope.cart = ShopService.getCurrentCart();

			logger.logSuccess('Product removed')

			$rootScope.$broadcast('cart-update', count);
		}

		$scope.clearCart = function(){
			ShopService.clearCart();
			$scope.cart = ShopService.getCurrentCart();

			logger.logSuccess('Cart cleared')

			$rootScope.$broadcast('cart-update', 0);
		}

		$scope.select = function(page) {
			var end, start;
			start = (page - 1) * $scope.numPerPage;
			end = start + $scope.numPerPage;
			return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
		};
		$scope.onFilterChange = function() {
			$scope.select(1);
			$scope.currentPage = 1;
			return $scope.row = '';
		};
		$scope.onNumPerPageChange = function() {
			$scope.select(1);
			return $scope.currentPage = 1;
		};
		$scope.onOrderChange = function() {
			$scope.select(1);
			return $scope.currentPage = 1;
		};
		$scope.search = function() {
			$scope.filteredStores = $filter('filter')($scope.cart, $scope.searchKeywords);
			return $scope.onFilterChange();
		};
		$scope.order = function(rowName) {
			if ($scope.row === rowName) {
				return;
			}
			$scope.row = rowName;
			$scope.filteredStores = $filter('orderBy')($scope.cart, rowName);
			return $scope.onOrderChange();
		};
		$scope.numPerPageOpt = [3, 5, 10, 20];
		$scope.numPerPage = $scope.numPerPageOpt[2];
		$scope.currentPage = 1;
		$scope.currentPageStores = [];

		init = function() {
	        $scope.search();
	        return $scope.select($scope.currentPage);
      	};
      
      	return init();
	}
	])
})();

