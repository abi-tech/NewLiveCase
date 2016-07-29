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
        template: ['<div class="g-config g-config-page"><section class="c-config"></div>'].join(''),
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            $rootScope.$on('page.changed', function ($event, index, page) {
                if(!$rootScope.currentPage) return;
                initViewPage();
            });

        	$rootScope.$watch('currentComponent', function (newVal, oldVal) { 
                if(newVal == oldVal) return;
                if(newVal == null){
                    initViewPage();
                    return;
                }
                $(".c-config", element).empty();
                newVal.buildConfig();
                var $html = $compile(newVal.$config)($rootScope);
                $(".c-config", element).append($html);
            });

            var initViewPage = function () {
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
            }
            initViewPage();
        }
    }
}]);


mainModule.directive('configCommon',['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: 'A',
        replace: true,
        template: '<section class="c-conf-section c-conf-tabSection"></section>',
        scope: {},
        link: function (scope, element, attrs) {
            var animateIn = $rootScope.currentComponent.options.animateIn;
            var animateOut = $rootScope.currentComponent.options.animateIn;
            var componentCss = $rootScope.currentComponent.options.componentCss;
            var left = $rootScope.currentComponent.options.left;
            var top = $rootScope.currentComponent.options.top;
            var width = $rootScope.currentComponent.options.width;
            var height = $rootScope.currentComponent.options.height;

            var confStyle = new ConfStyle({
                data: { 
                    backgroundColor: componentCss["background-color"], 
                    borderWidth: 20, 
                    borderColor: "rgba(30, 30, 30, 0)",
                    borderRadius: 40,
                    opacity: 50,
                    rotate: 60
                },
                onChange: function (data) {
                    console.log(data); //transform: rotate(0deg);
                    $rootScope.currentComponent.setComponentCss(data);
                    // $rootScope.currentComponent.componentCss["background-color"] = data["backgroundColor"];
                    // $rootScope.currentComponent.componentCss["border-width"] = data["borderWidth"];
                    // $rootScope.currentComponent.componentCss["border-color"] = data["borderColor"];
                    // $rootScope.currentComponent.componentCss["border-radius"] = data["borderRadius"];
                    // $rootScope.currentComponent.componentCss["opacity"] = parseInt(data["opacity"]) / 100;
                    // $rootScope.currentComponent.componentCss["transform"] = "rotate(" + data["rotate"] + "deg)";
                    $rootScope.$apply();
                }
            });

            var confAnimation = new ConfAnimation({
                data: { 
                    in: animateIn,
                    out: animateOut
                },
                onAnimateIn: function (data) {
                    console.log("onAnimateIn", data);
                    $rootScope.currentComponent.animate(data);
                },
                onAnimateOut: function (data) {
                    console.log("onAnimateOut", data);
                    $rootScope.currentComponent.animate(data);
                },
                onAnimInChange: function (data) {
                    console.log("onAnimInChange", data);
                    $rootScope.currentComponent.animateIn = data;
                    $rootScope.currentComponent.animate(data);
                },
                onAnimOutChange: function (data) {
                    console.log("onAnimOutChange", data);
                    $rootScope.currentComponent.animate(data);
                }
            });

            var confXYWH = new ConfXYWH({
                data: { "left": left, "top": top, "width": width, "height": height },
                onChange: function (data) {
                    console.log(data);
                    $rootScope.currentComponent.setLeft(data.left);
                    $rootScope.currentComponent.containerCss["top"] = data["top"] * scale;
                    $rootScope.currentComponent.containerCss["width"] = data["width"] * scale;
                    $rootScope.currentComponent.containerCss["height"] = data["height"] * scale;
                    $rootScope.$apply();
                }
            });

            var uiTab = new UITab({
                active: 0,
                list: [
                    { name: "样式", dom: confStyle.$html },
                    { name: "动画", dom: confAnimation.$html }
                ]
            });

            element.append(uiTab.$html);
            element.after(confXYWH.$html);
            element.after(confAnimation.$html);
            element.after(confStyle.$html);
        }
    };
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