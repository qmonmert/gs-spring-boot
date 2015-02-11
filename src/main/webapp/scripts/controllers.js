'use strict';

/* Controllers */

springBootApp.controller('AdminController', function($scope, $rootScope, $resource, $location, AdminService, ROLES) {

    // Get all the users
    var getUsers = function() {
        AdminService.getUsers().then(function(promise) {
            $scope.users = promise;
        });
    }
    getUsers();

    // Create a user
    $rootScope.user = new Object();
    $scope.createUser = function() {
        var createUser = $resource('/user/post/');
        createUser.save($rootScope.user, function() {
            getUsers(); // refresh the list of users
            $rootScope.user = new Object();
        });
    };

    // Update a user in a modal
    $scope.updateUser = function() {
        if ($('#radioAdmin').get(0).checked) {
            $scope.userSelected.role = ROLES.admin;
        } else {
            $scope.userSelected.role = ROLES.user;
        }
        var resourceUpdateUser = $resource('/user/post/');
        resourceUpdateUser.save($scope.userSelected, function() {
            getUsers(); // refresh the list of users
            $('#userModal').modal('hide');
        });
    };

    // Show a user in a modal
    $scope.showUser = function (id) {
        AdminService.getUser(id).then(function(promise) {
            $scope.userSelected = promise;
            if ($scope.userSelected.role == ROLES.admin) {
                $('#radioAdmin').get(0).checked = true;
                $('#radioUser').get(0).checked = false;
            } else {
                $('#radioAdmin').get(0).checked = false;
                $('#radioUser').get(0).checked = true;
            }
            $('#userModal').modal('show');
        });
    };

});

springBootApp.controller('LoginController', function($scope, $rootScope, $location, LoginService, ROLES) {

    // Alert messages
    $scope.messages = [];

    // Function to log in the application (by login/password)
    $scope.login = function() {
        var login = $scope.user.login;
        var password = $scope.user.password;
        getUserByLoginAndPassword(login, password);
    };

    // Call a service to check the login/password
    var getUserByLoginAndPassword = function(login, password) {
        LoginService.getUserByLoginAndPassword(login, password).then(function(promise) {
            if (promise != '') {
                $rootScope.user = promise;
                $location.path("/home");
                $rootScope.isAdmin = ($rootScope.user.role == ROLES.admin);
                $rootScope.isConnected = true;
            } else {
                $rootScope.isConnected = false;
                $scope.messages.push({type: 'success', msg: 'Authentication failed'});
            }
        });
    }

    // Remove an alert message
    $scope.closeAlert = function(index) {
        $scope.messages.splice(index, 1);
    };

});

springBootApp.controller('TimeLineController', function($scope, $rootScope, $resource, TimeLineService) {

    $scope.user = $rootScope.user;

    // Alert messages
    $scope.messages = [];

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
            getAllTweetsByUser();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Message sent !!!'});
        });
    };

    // Remove an alert message
    $scope.closeAlert = function(index) {
        $scope.messages.splice(index, 1);
    };

    //var res = $http.get('/tweet/getByUser/'+ $rootScope.user.id);
    //res.success(function(data, status, headers, config) {
    //    debugger;
    //});
    //res.error(function(data, status, headers, config) {
    //    debugger;
    //});
});

springBootApp.controller('HomeController', function($scope, $rootScope, $resource, HomeService) {

    $scope.user = $rootScope.user;

    // Alert messages
    $scope.messages = [];

    var getAllTweets = function() {
        HomeService.getAllTweets().then(function(promise) {
            $scope.tweets = promise;
            $('#nbTweets').html($scope.tweets.length);
        });
    }
    getAllTweets();

    // Create a tweet
    $scope.tweet = new Object();
    $scope.createTweet = function() {
        var resourceCreateTweet = $resource('/tweet/post/' + $scope.user.id);
        resourceCreateTweet.save($scope.tweet, function() {
            getAllTweets();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Message sent !!!'});
        });
    };

    // Remove an alert message
    $scope.closeAlert = function(index) {
        $scope.messages.splice(index, 1);
    };

});

