'use strict';

/* Directives */

angular.module('springBootApp').directive("springBootDirective", function() {

    //return {
    //    restrict: 'E',
    //    scope: {
    //        listlogs: '=listlogs',
    //        classtablelog: '@classtablelog'
    //    },
    //    templateUrl: '/templates/logsTemplate.html',
    //    link: function($scope,elem,attr) {
    //        $scope.showLog = function (logSelected) {
    //            $scope.$parent.logSelected = logSelected;
    //            $scope.$parent.logSelected.date = new Date(logSelected.date); // hack
    //            $("#datepickerLogSelected").datepicker("option", "dateFormat", "DD, d MM, yy");
    //            $('#logModal').modal('show');
    //        }
    //    },
    //    replace: true
    //}
});
