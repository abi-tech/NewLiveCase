mainModule.directive("previewArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/previewArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        	
        }
    }
}]);