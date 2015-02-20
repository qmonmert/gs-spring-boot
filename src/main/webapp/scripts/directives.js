'use strict';

/* Directives */

angular.module('springBootApp').directive("tweetdirective", function() {

    return {
        restrict: 'E',
        scope : true, // to use the function of the controller
        //restrict: 'E',
        //scope: {
        //    tweet: '=tweet'
        //},
        templateUrl: '/templates/tweet.html'
    }

});
