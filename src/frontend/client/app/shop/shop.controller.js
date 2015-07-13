(function () {
	'use strict';

	angular
	.module('app.shop')
	.controller('ShopController', ['$rootScope', '$scope', '$routeParams', '$location', 'logger', 'ShopService', '$http', '$modal', 'lodash','ENV', function($rootScope, $scope, $routeParams, $location, logger, ShopService, $http, $modal, _, ENV) {
		var currentCategoryId = 0;

		$scope.currentCategoryName = '';
		$scope.order = 'Default Order';

		function loadProducts() {
			$scope.loading = true;
			ShopService.getCurrentProducts()
				.then(function(data, m){
					$scope.products = data;

					ShopService.getCurrentCategories()
						.then(function(data){
							$scope.categories = data;

							if ($routeParams.categoryId) {
								currentCategoryId = parseInt($routeParams.categoryId, 10);
							}

							$scope.currentCategoryName = $scope.categories[currentCategoryId];
							$rootScope.$broadcast('category-refresh');
						})

					$scope.false = true;

				}, function(data){
					if (data.errors && data.errors[0].message){
                        logger.logError(data.errors[0].message);
                    } else {
                        logger.logError("An error occurred. Please try again.");
                    }
				});

		}

		$scope.changeOrder = function(order){
			$scope.order = order;
		}

		$scope.showProductDescription = function(productId){
			ShopService.getProductDetail(productId)
				.then(function(data){
			        var modalInstance;
			        modalInstance = $modal.open({
			          templateUrl: "productInfoModal.html",
			          controller: 'ModalInstanceCtrl',
			          resolve: {
			            items: function() {
			              return data;
			            }
			          }
			        });
			        modalInstance.result.then((function(selectedItem) {
			          $scope.selected = selectedItem;
			        }), function() {
			        });
				}, function(error){
					logger.logError("Could not load product information.");
				})

		
		}

		$scope.addToCart = function(name, price, productId){
			ShopService.addToCart(name, price, productId);

			logger.logSuccess('Product added to cart');

			var count = ShopService.getCartTotalItems();

			$rootScope.$broadcast('cart-update', count);
		}

		$rootScope.$on('show-products', function(data, index){
			currentCategoryId = index;

			$scope.currentCategoryName = $scope.categories[currentCategoryId];
		});

		loadProducts();
	}
	])
})();

