'use strict';

/* Controllers */

springBootApp.controller('AdminController', function($scope, $rootScope, $resource, $location, $cookieStore, AdminService, ROLES) {

    // Current user
    var user = $cookieStore.get('user');
    $scope.user = user;
    $rootScope.isAdmin = $cookieStore.get('isAdmin');
    $rootScope.isConnected = $cookieStore.get('isConnected');
    if (user == null || $rootScope.isAdmin == null || $rootScope.isConnected == null) {
        $location.path("/");
    }

    // Get all the users
    var getUsers = function() {
        AdminService.getUsers().then(function(promise) {
            $scope.users = promise;
        });
    }
    getUsers();

    // Create a user
    $scope.userCreated = new Object();
    $scope.createUser = function() {
        var createUser = $resource('/user/post/');
        createUser.save($scope.userCreated, function() {
            getUsers(); // refresh the list of users
            $scope.userCreated = new Object();
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

springBootApp.controller('LoginController', function($scope, $rootScope, $location, $cookieStore, LoginService, ROLES) {

    // Logout the user
    $rootScope.isConnected = false;
    $rootScope.isAdmin = false;
    $cookieStore.put("user", null);
    $cookieStore.put("isConnected", false);
    $cookieStore.put("isAdmin", false);

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
                var userLogged = promise;
                $cookieStore.put("isAdmin", (userLogged.role == ROLES.admin));
                $cookieStore.put("isConnected", true);
                $cookieStore.put("user", userLogged);
                $rootScope.isConnected = true;
                $rootScope.isAdmin = (userLogged.role == ROLES.admin);
                $location.path("/home");
            } else {
                $scope.messages.push({type: 'success', msg: 'Authentication failed'});
            }
        });
    }

    // Logout
    $rootScope.logout = function() {
        $location.path("/");
    }

    // Remove an alert message
    $scope.closeAlert = function(index) {
        $scope.messages.splice(index, 1);
    };

});

springBootApp.controller('TimeLineController', function($scope, $rootScope, $resource, $cookieStore, TimeLineService) {

    // Current user
    var user = $cookieStore.get('user');
    $scope.user = user;
    $rootScope.isAdmin = $cookieStore.get('isAdmin');
    $rootScope.isConnected = $cookieStore.get('isConnected');
    if (user == null || $rootScope.isAdmin == null || $rootScope.isConnected == null) {
        $location.path("/");
    }

    // Alert messages
    $scope.messages = [];

    var getAllTweetsByUser = function() {
        TimeLineService.getAllTweetsByUser(user.id).then(function (promise) {
            $scope.tweets = promise;
            $('#nbTweets').html($scope.tweets.length);
        });
    }
    getAllTweetsByUser();

    // Create a tweet
    $scope.tweet = new Object();
    $scope.createTweet = function() {
        var resourceCreateTweet = $resource('/tweet/post/' + user.id);
        resourceCreateTweet.save($scope.tweet, function () {
            getAllTweetsByUser();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Message sent !!!'});
        });
    };

    // Delete a tweet
    $scope.deleteTweet = function(tweetId) {
        TimeLineService.deleteTweet(tweetId).then(function (promise) {
            getAllTweetsByUser();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Tweet deleted !!!'});
        });
    };

    // Remove an alert message
    //$scope.closeAlert = function(index) {
    //    $scope.messages.splice(index, 1);
    //};

    //var res = $http.get('/tweet/getByUser/'+ $rootScope.user.id);
    //res.success(function(data, status, headers, config) {
    //    debugger;
    //});
    //res.error(function(data, status, headers, config) {
    //    debugger;
    //});
});

springBootApp.controller('HomeController', function($scope, $rootScope, $resource, $cookieStore, HomeService) {

    // Current user
    var user = $cookieStore.get('user');
    $scope.user = user;
    $rootScope.isAdmin = $cookieStore.get('isAdmin');
    $rootScope.isConnected = $cookieStore.get('isConnected');
    if (user == null || $rootScope.isAdmin == null || $rootScope.isConnected == null) {
        $location.path("/");
    }

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
        var resourceCreateTweet = $resource('/tweet/post/' + user.id);
        resourceCreateTweet.save($scope.tweet, function () {
            getAllTweets();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Message sent !!!'});
        });
    };

    // Delete a tweet
    $scope.deleteTweet = function(tweetId) {
        HomeService.deleteTweet(tweetId).then(function (promise) {
            getAllTweets();
            $scope.tweet = new Object();
            $scope.messages.push({type: 'success', msg: 'Tweet deleted !!!'});
        });
    };

    // Remove an alert message
    $scope.closeAlert = function(index) {
        $scope.messages.splice(index, 1);
    };

});

springBootApp.controller('LanguageController', function ($scope, $translate, LanguageService) {
    $scope.changeLanguage = function (languageKey) {
        $translate.use(languageKey);

        LanguageService.getBy(languageKey).then(function(languages) {
            $scope.languages = languages;
        });
    };

    LanguageService.getBy().then(function (languages) {
        $scope.languages = languages;
    });
});

