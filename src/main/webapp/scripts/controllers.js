'use strict';

/* Controllers */

springBootApp.controller('LoginController', function($scope, $rootScope, $location, $cookieStore, LoginService, ROLES, ENV) {

    // Logout the user
    $rootScope.isConnected = false;
    $rootScope.isAdmin = false;
    $cookieStore.put("user", null);
    $cookieStore.put("isConnected", false);
    $cookieStore.put("isAdmin", false);

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
                $rootScope.messages.push({type: 'success', msg: 'Authentication failed'});
            }
        });
    }

});

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

springBootApp.controller('TimeLineController', function($scope, $rootScope, $resource, $cookieStore, TimeLineService) {

    // Current user
    var user = $cookieStore.get('user');
    $scope.user = user;
    $rootScope.isAdmin = $cookieStore.get('isAdmin');
    $rootScope.isConnected = $cookieStore.get('isConnected');
    if (user == null || $rootScope.isAdmin == null || $rootScope.isConnected == null) {
        $location.path("/");
    }

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
            $rootScope.messages.push({type: 'success', msg: 'Message sent !!!'});
        });
    };

    // Delete a tweet
    $scope.deleteTweet = function(tweetId) {
        TimeLineService.deleteTweet(tweetId).then(function (promise) {
            getAllTweetsByUser();
            $scope.tweet = new Object();
            $rootScope.messages.push({type: 'success', msg: 'Tweet deleted !!!'});
        });
    };

});

springBootApp.controller('HomeController', function($scope, $rootScope, $resource, $cookieStore, $timeout, $interval, HomeService) {

    // Current user
    var user = $cookieStore.get('user');
    $scope.user = user;
    $rootScope.isAdmin = $cookieStore.get('isAdmin');
    $rootScope.isConnected = $cookieStore.get('isConnected');
    if (user == null || $rootScope.isAdmin == null || $rootScope.isConnected == null) {
        $location.path("/");
    }

    // Nb tweets
    $scope.nbTweetsDisplay = 0;
    $scope.nbTweetsReal = 0;
    $scope.nbNewTweets = 0;
    $scope.lastTweetIdDisplay = '';
    $scope.lastTweetIdReal = '';

    var getAllTweets = function() {
        HomeService.getAllTweets().then(function(promise) {
            $scope.tweets = promise;
            $('#nbTweets').html($scope.tweets.length);
            $('#notificationNewTweets').css('display', 'none');
            $scope.nbTweetsDisplay = $scope.tweets.length;
            $scope.lastTweetIdDisplay = promise[0].id;
        });
    };
    getAllTweets();

    // Get all the tweets to check if there is new tweets
    var checkTweets = function() {
        HomeService.getAllTweets().then(function(promise) {
            $scope.nbTweetsReal = promise.length;
            $scope.lastTweetIdReal = promise[0].id;
            $scope.nbNewTweets = $scope.nbTweetsReal - $scope.nbTweetsDisplay;
            if ($scope.lastTweetIdReal != $scope.lastTweetIdDisplay && $scope.nbNewTweets > 0) {
                $('#notificationNewTweets').css('display', 'block');
            } else {
                $('#notificationNewTweets').css('display', 'none');
            }
        });
    };

    // Create a tweet
    $scope.tweet = new Object();
    $scope.createTweet = function() {
        var resourceCreateTweet = $resource('/tweet/post/' + user.id);
        resourceCreateTweet.save($scope.tweet, function () {
            getAllTweets();
            $scope.tweet = new Object();
            $rootScope.messages.push({type: 'success', msg: 'Message sent !!!'});
            closeAlertTimeout();
        });
    };

    // Delete a tweet
    $scope.deleteTweet = function(tweetId) {
        HomeService.deleteTweet(tweetId).then(function (promise) {
            getAllTweets();
            $scope.tweet = new Object();
            $rootScope.messages.push({type: 'success', msg: 'Tweet deleted !!!'});
            closeAlertTimeout();
        });
    };

    // Remove an alert message with timeout
    var closeAlertTimeout = function() {
        $timeout(function() {
            $rootScope.closeAlert();
        }, 4000);
    };

    // Check the new tweets
    $interval(checkTweets, $rootScope.REFRESH_TIME);

    // Click on the new tweets
    $scope.seeNewTweets = function() {
        getAllTweets();
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

