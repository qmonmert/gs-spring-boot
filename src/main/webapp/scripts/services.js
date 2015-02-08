'use strict';

/* Services */

angular.module('springBootApp').factory('SpringBootService', function ($http) {
    return {
        getUsers: function () {
            var promise = $http.get('/user/getAll').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

angular.module('springBootApp').factory('TimeLineService', function ($http, $resource) {
    return {
        getAllTweets: function () {
            var promise = $http.get('/tweet/getAll').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getAllTweetsByUser: function (userId) {
            var promise = $http.get('/tweet/getByUser/' + userId).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

angular.module('springBootApp').factory('LoginService', function ($http) {
    return {
        getUserByLoginAndPassword: function (login, password) {
            var promise = $http.get('/user/getByLoginAndPassword/' + login + "/" + password).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

