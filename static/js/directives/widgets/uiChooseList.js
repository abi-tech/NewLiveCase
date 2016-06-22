var tpl_widget_chooselist = [
'<li>',
    '<a href="javascript:void(0);">',
        '<div></div>',
    '</a>',
    '<p></p>',
'</li>',
].join('');

mainModule.directive("chooseList", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        replace: true,
        link: function (scope, element, attrs) {
        	var chooseOptions = scope.chooseOptions;
        }
    }
}]);