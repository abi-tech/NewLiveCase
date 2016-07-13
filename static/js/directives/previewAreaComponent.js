mainModule.directive("previewAreaComponent", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/configArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        }
    }
}]);