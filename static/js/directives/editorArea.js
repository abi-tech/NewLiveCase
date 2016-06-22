mainModule.directive("editorArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/editorArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        }
    }
}]);