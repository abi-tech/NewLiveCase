var ConfigAreaBuilder = function (options) {
	that.defaultOptions = {
    };
}

mainModule.directive("configArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: '<div class="g-config g-config-page"><section class="c-config"></section></div>',
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {


        	$rootScope.$watch('currentComponent', function (newVal, oldVal) {
                console.log(newVal, oldVal);

                $(".c-config", element).empty();

                if(!$rootScope.currentComponent) return;

                var $html = $compile($rootScope.currentComponent.$config)($rootScope);
            	$(".c-config", element).append($html);
            });
        }
    }
}]);

mainModule.directive('configPosition', function () {
    return {
        restrict: 'A',
        replace: true,
        template: [
            '<section class="c-conf-section c-conf-common">',
                '<div class="c-conf-row c-conf-row-3">',
                    '<label class="c-input-label" for="left">位置</label>',
                    '<div class="c-input-box">',
                        '<label class="u-label f-mr-9">X轴</label>',
                        '<input type="text" id="left" class="u-textbox f-mr-40" size="10" ng-model="currentComponent.options.x" />',
                        '<label class="u-label f-mr-9" for="top">Y轴</label>',
                        '<input type="text" id="top" class="u-textbox" size="10" ng-model="currentComponent.options.y" />',
                    '</div>',
                '</div>',
                '<div class="c-conf-row">',
                    '<label class="c-input-label" for="width">大小</label>',
                    '<div class="c-input-box">',
                        '<label class="u-label f-mr-9">宽</label>',
                        '<input type="text" id="width" class="u-textbox f-mr-40" size="10" ng-model="currentComponent.options.width" />',
                        '<label class="u-label f-mr-9">高</label>',
                        '<input type="text" id="height" class="u-textbox" size="10" ng-model="currentComponent.options.height" />',
                    '</div>',
                '</div>',
            '</section>'
        ].join(''),
        link: function (scope, element, attrs) {

        }
    };
});