'use strict';

// Module
var springBootApp = angular.module('springBootApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngCookies', 'pascalprecht.translate']);


springBootApp.run(function ($rootScope, $http, $location, ENV, REFRESH_TIME, VERSION) {
    $rootScope.ENV = ENV;
    $rootScope.REFRESH_TIME = REFRESH_TIME;
    $rootScope.VERSION = VERSION;

    // Alert messages
    $rootScope.messages = [];

    // Remove an alert message
    $rootScope.closeAlert = function(index) {
        $rootScope.messages.splice(index, 1);
    };

    // Logout
    $rootScope.logout = function() {
        $location.path("/");
    }

});

springBootApp.config(function ($routeProvider, $translateProvider) {

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

    // Initialize angular-translate
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');

    $translateProvider.useCookieStorage();

});
