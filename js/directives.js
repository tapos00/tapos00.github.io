angular.module("alldirective",[])
    .directive('leftBar', function() {
        return {
            restrict: 'EA',
            templateUrl: 'partial/leftSidebar.html'
        };
    });
