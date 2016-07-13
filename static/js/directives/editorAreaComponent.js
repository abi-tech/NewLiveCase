mainModule.directive("editorAreaComponent", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: '<div class="f-abs c-c-container"><div class="tl-c"></div><div class="tr-c"></div><div class="bl-c"></div><div class="br-c"></div></div>',
        replace: true,
        link: function (scope, element, attrs) {
        	console.log(scope);
        	console.log(element);
        	console.log(element);
        }
    }
}]);