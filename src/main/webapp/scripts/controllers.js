'use strict';

/* Controllers */

springBootApp.controller('SpringBootController', function($scope, $rootScope, $resource, $location, SpringBootService) {

    var getUsers = function() {
        SpringBootService.getUsers().then(function(promise) {
            $scope.users = promise;
        });
    }
    getUsers();

    // Create a user
    $rootScope.user = new Object();
    $scope.createUser = function() {
        var createUser = $resource('/user/post/');
        createUser.save($rootScope.user, function() {
            console.log("Create user : success !");
            getUsers();
            $rootScope.user = new Object();
        });
    };

    $scope.goTwitter = function(user) {
        $rootScope.user = user;
        $location.path("/timeline");
    };

});

springBootApp.controller('TimeLineController', function($scope, $rootScope, $resource, TimeLineService) {

    $scope.user = $rootScope.user;

    var getAllTweetsByUser = function() {
        TimeLineService.getAllTweetsByUser($scope.user.id).then(function(promise) {
            $scope.tweets = promise;
            $('#nbTweets').html($scope.tweets.length);
        });
    }
    getAllTweetsByUser();

    // Create a tweet
    $scope.tweet = new Object();
    $scope.createTweet = function() {
        var resourceCreateTweet = $resource('/tweet/post/' + $scope.user.id);
        resourceCreateTweet.save($scope.tweet, function() {
            console.log("Create tweet : success !");
            getAllTweetsByUser();
            $scope.tweet = new Object();
        });
    };

    //var res = $http.get('/tweet/getByUser/'+ $rootScope.user.id);
    //res.success(function(data, status, headers, config) {
    //    debugger;
    //});
    //res.error(function(data, status, headers, config) {
    //    debugger;
    //});
});

springBootApp.controller('LoginController', function($scope, $rootScope, $location, LoginService, ROLES) {

    $scope.login = function() {
        var login = $scope.user.login;
        var password = $scope.user.password;
        getUserByLoginAndPassword(login, password);
    };

    var getUserByLoginAndPassword = function(login, password) {
        LoginService.getUserByLoginAndPassword(login, password).then(function(promise) {
            if (promise != '') {
                $rootScope.user = promise;
                $location.path("/timeline");
                $rootScope.isAdmin = ($rootScope.user.role == ROLES.admin);
            } else {

            }
        });
    }

});

springBootApp.controller('MainController', function($scope, $rootScope, $location) {
});

