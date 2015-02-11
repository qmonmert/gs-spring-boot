'use strict';

// Module
var springBootApp = angular.module('springBootApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);

springBootApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })
        .when('/timeline', {
            templateUrl: 'views/timeline.html',
            controller: 'TimeLineController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
