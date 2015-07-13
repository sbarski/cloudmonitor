(function () {
  'use strict';

  angular
    .module('app.shop')
    .filter('query', ['aiStorage', 'lodash', function(aiStorage, _) {
    	return function(items, search){
    		if (!search){
    			return items;
    		}

    		var result = _.filter(items, 'category_name', search);

    		return result;
    	}
    }
  ]).filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])
  .filter('orderBy', ['lodash', function(_){
        return function(items, order) {
            if (!order) {
                return items;
            }

            if (order == "Default Order"){
                return items;
            } else if (order === 'Products A-Z') {
                return _.sortBy(items, "product_caption");
            } else if (order === 'Price $-$') {
                return _.sortBy(items, "unit_price")
            }

        };
    }]);
})();

