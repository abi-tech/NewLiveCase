var ConfigAreaBuilder = function (options) {
	that.defaultOptions = {
    };
}

var ConfPage = function (options) {
    // body...
}

mainModule.directive("configArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: '<div class="g-config g-config-page"><section class="c-config"></section></div>',
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            $rootScope.$watch('currentPage', function (newVal, oldVal) {
                if(!$rootScope.currentPage) return;
                $(".c-config", element).empty();
                var tpl = [
                '<section class="c-config-wapper none">',
                    '<section class="c-conf-section c-conf-triggerSection z-expand">',
                        '<h2>配置</h2><i class="icon-x20 icon-x20-down"></i>',
                    '</section>',
                    '<div class="c-background-pop">',
                        '<div page-background-image></div>',
                        '<div page-background-color></div>',
                    '</div>',
                    '<section class="c-conf-section z-expand">',
                        '<div page-slider-icon></div><hr>',
                        '<h2>翻页动画</h2>',
                        '<div page-slide-animation></div>',
                    '</section>',
                '</section>'
                ].join('');

                var $html = $compile(tpl)($rootScope);
                $(".c-config", element).append($html);
            });

        	$rootScope.$watch('currentComponent', function (newVal, oldVal) {
                if(!$rootScope.currentComponent) return;
                $(".c-config", element).empty();
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
            console.log(scope.currentComponent);
        }
    };
});