'use strict';

// Module
//var springBootApp = angular.module('springBootApp', ['http-auth-interceptor', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ngSanitize', 'anguFixedHeaderTable']);
var springBootApp = angular.module('springBootApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);

springBootApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'SpringBootController'
        })
        .when('/timeline', {
            templateUrl: 'views/timeline.html',
            controller: 'TimeLineController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
