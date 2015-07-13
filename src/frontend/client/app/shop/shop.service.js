(function () {
  'use strict';

  angular
  .module('app.shop')
  .factory('ShopService', ['UserService', 'aiStorage', '$http', 'ENV', 'logger', 'lodash', '$q', function(UserService, aiStorage, $http, ENV, logger, _, $q) {

    var products = aiStorage.get('products') || null;
    var categories = aiStorage.get('categories') || null;
    var cart = aiStorage.get('cart') || [];
    var productInformation = {};

    function getCurrentCategories(){
        if (!categories){
            return getCurrentProducts().
            then(function(data){
                categories = _.uniq(_.pluck(_.filter(data.content, 'category_name'), 'category_name'));
                aiStorage.set('categories', categories);
                return categories;
            });
        } else {
            return $q.when(categories);
        }
    }

    function getCurrentProducts(){
        if (!products) {
            var user = UserService.getCurrentUser();

            var data = {
                customerId : user.customer_code,
                deliveryDayId : user.customer_details.AfdRoundDivisionDeliveryDay[0].rounddivisiondeliverydayid,
                deliveryDate: user.customer_details.customer_next_delivery_date,
                userHash: user.customer_details.user_hash
            }

            return $http.post(ENV.apiEndpoint + '/user/products', data)
            .then(function(data, status){
                products = angular.copy(JSON.parse(data.data));
                aiStorage.set('products', products);
                logger.log('Latest products loaded! Happy shopping :)');

                return products;
            }, function(data, status){
                return data;
            });
        }
        else {
            return $q.when(products);
        }
    }

    function getProductDetail(productId){
        if (productId in productInformation){
            return $q.when(productInformation[productId]);
        }

        return $http.get(ENV.apiEndpoint + '/user/product?productId=' + productId)
        .then(function(data){
            productInformation[productId] = angular.copy(JSON.parse(data.data));
            return productInformation[productId];
        }, function (error){
            return error;
        })
    }

    function addToCart(name, price, productId){
        cart = aiStorage.get('cart') || [];

        var quantity = 1;

        var product = _.find(cart, 'productId', productId);

        if (product){
            var index = cart.indexOf(product);

            product.quantity = product.quantity + 1;

            cart[index] = product;
        } else {
            cart.push({"name" : name, "price" : price, "productId" : productId, "quantity" : quantity});
        }

        aiStorage.set('cart', cart);
    }

    function getCartTotalItems(){
        cart = aiStorage.get('cart') || [];

        return _.reduce(cart, function(total, n, key){
            return total + n.quantity;
        }, 0);
    }

    function getCurrentCart(){
        cart = aiStorage.get('cart') || [];

        return cart;
    }

    function addItem(productId){
        cart = aiStorage.get('cart') || [];

        var product = _.find(cart, 'productId', productId);

        if (product){
            var index = cart.indexOf(product);

            product.quantity = product.quantity + 1;

            cart[index] = product;
        }

        aiStorage.set('cart', cart);

        return getCartTotalItems();
    }

    function removeItem(productId){
        cart = aiStorage.get('cart') || [];

        var product = _.find(cart, 'productId', productId);

        if (product){
            var index = cart.indexOf(product);

            product.quantity = product.quantity - 1;

            if (product.quantity < 0){
                product.quantity = 0;
            }

            cart[index] = product;
        }

        aiStorage.set('cart', cart);

        return getCartTotalItems();
    }

    function removeProduct(productId){
        cart = aiStorage.get('cart') || [];

        var product = _.find(cart, 'productId', productId);

        if (product){
            var index = cart.indexOf(product);

            cart.splice(index, 1)

            aiStorage.set('cart', cart);
        }

        return getCartTotalItems();
    }

    function clearCart(){
        cart = [];

        aiStorage.set('cart', cart);
    }

    function clear(){
        products = null;
        categories= null;
    }

    return {
        getCurrentProducts : getCurrentProducts,
        getCurrentCategories : getCurrentCategories,
        getProductDetail : getProductDetail,
        addToCart : addToCart,
        clearCart : clearCart,
        getCurrentCart : getCurrentCart,
        getCartTotalItems : getCartTotalItems,
        clear: clear,
        addItem : addItem,
        removeItem : removeItem,
        removeProduct : removeProduct,
    }
}
])
})();

