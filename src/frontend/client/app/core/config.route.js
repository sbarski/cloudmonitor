(function () {
    'use strict';

    angular
    .module('app')
    .config(['$routeProvider', '$httpProvider', 'jwtInterceptorProvider', 'authProvider', function($routeProvider, $httpProvider, jwtInterceptorProvider, authProvider) {
        var routes, setRoutes;

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('jwtInterceptor');

        authProvider.init({
            domain: 'cloudmonitor.auth0.com',
            clientID: 'ug8i9JketQl4qmgblHfDSck6nfEOmkMf'
        });

        jwtInterceptorProvider.tokenGetter = ['aiStorage', function(store) {
            // Return the saved token
            return store.get('token');
        }];

        routes = [
        'page/frontpage',
        'page/404', 
        'page/500', 
        'page/blank', 
        'page/forgot-password', 
        'page/invoice', 
        'page/lock-screen', 
        ]

        setRoutes = function(route) {
            var config, url;
            url = '/' + route;
            config = {
                templateUrl: 'app/' + route + '.html'
            };
            $routeProvider.when(url, config);
            return $routeProvider;
        };

        routes.forEach(function(route) {
            return setRoutes(route);
        });

        $routeProvider
        .when('/', {
            redirectTo: '/dashboard'
        })
        .when('/frontpage', {
            templateUrl: 'app/page/frontpage.html',
            access: {
                auth: false,
            }
        })
        .when('/dashboard', {
            templateUrl: '/app/dashboard/dashboard.html',
        })
        .when('/shop', {
            templateUrl: 'app/shop/shop.html',
        })
        .when('/profile', {
            templateUrl: 'app/profile/profile.html',
        })
        .when('/cart', {
            templateUrl: 'app/cart/cart.html',
        })
        .when('/lock-screen', {
            templateUrl: 'app/profile/lock-screen.html',
        })
        .when('/404', {
            templateUrl: 'app/page/404.html',
            access: {
                auth: false
            }
        })
        .otherwise({ redirectTo: '/404'});

    }]);

    angular
    .module('app')
    .run(['$rootScope', '$location', 'UserService', 'logger', 'auth', function($rootScope, $location, UserService, logger, auth) {

        auth.hookEvents();

        var reqAuthentication = function(next){
            return !(next.access && next.access.auth === false);
        }

        $rootScope.$on('$routeChangeStart', function(event, next, current){
            if (reqAuthentication(next) && !UserService.isAuthenticated()) {
                $location.path('/frontpage');
            }
        });

    }]);

})();