mainModule.directive("previewDialog", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/previewDialog.html",
        replace: true,
        link: function (scope, element, attrs) {
        }
    }
}]);