'use strict';

/* Services */

/*****************/
/***** LOGIN *****/
/*****************/
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

/*****************/
/***** ADMIN *****/
/*****************/
angular.module('springBootApp').factory('AdminService', function ($http) {
    return {
        getUsers: function () {
            var promise = $http.get('/user/getAll').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getUser: function (id) {
            var promise = $http.get('/user/getById/' + id).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

/********************/
/***** TIMELINE *****/
/********************/
angular.module('springBootApp').factory('TimeLineService', function ($http, $resource) {
    return {
        getAllTweetsByUser: function (userId) {
            var promise = $http.get('/tweet/getByUser/' + userId).then(function (response) {
                return response.data;
            });
            return promise;
        },
        deleteTweet: function (tweetId) {
            var promise = $http.delete('/tweet/delete/' + tweetId).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

/****************/
/***** HOME *****/
/****************/
angular.module('springBootApp').factory('HomeService', function ($http, $resource) {
    return {
        getAllTweets: function () {
            var promise = $http.get('/tweet/getAllOrderByDate').then(function (response) {
                return response.data;
            });
            return promise;
        },
        deleteTweet: function (tweetId) {
            var promise = $http.delete('/tweet/delete/' + tweetId).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});

/********************/
/***** LANGUAGE *****/
/********************/
angular.module('springBootApp').factory('LanguageService', function ($http, $translate, LANGUAGES) {
    return {
        getBy: function(language) {
            if (language == undefined) {
                language = 'en';
            }
            var promise =  $http.get('i18n/' + language + '.json').then(function(response) {
                return LANGUAGES;
            });
            return promise;
        }
    };
});
