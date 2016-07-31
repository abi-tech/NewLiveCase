mainModule.directive("configArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: ['<div class="g-config g-config-page"><section class="c-config"></div>'].join(''),
        replace: true,
        scope: true,
        link: function (scope, element, attrs) {
            var newScope;

            function destroy() {
                newScope && newScope.$destroy();
                delete newScope;
                newScope = $rootScope.$new();
                scope.$destroy();
            }

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

                destroy();

                var $html = $compile(newVal.$config)(newScope);
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
                        '<div page-configother></div>',
                    '</section>',
                '</section>'
                ].join('');

                destroy();
                var $html = $compile(tpl)(newScope);
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
        link: function (scope, element, attrs) {
            var component = $rootScope.currentComponent;
            var left = component.options.left;
            var top = component.options.top;
            var width = component.options.width;
            var height = component.options.height;
            var backgroundColor = component.options.backgroundColor;
            var borderWidth = component.options.borderWidth;
            var borderColor = component.options.borderColor;
            var borderRadius = component.options.borderRadius;
            var opacity = component.options.opacity;
            var rotate = component.options.rotate;
            var animateIn = component.options.animateIn;
            var animateOut = component.options.animateOut;
            
            var confStyle = new ConfStyle({
                data: { 
                    backgroundColor: backgroundColor, 
                    borderWidth: borderWidth, 
                    borderColor: borderColor,
                    borderRadius: borderRadius,
                    opacity: opacity,
                    rotate: rotate
                },
                onChange: function (data) {
                    //console.log(data);
                    $rootScope.currentComponent.setComponentCss(data);
                    $rootScope.$apply();
                }
            });

            var confAnimation = new ConfAnimation({
                data: { 
                    in: animateIn,
                    out: animateOut
                },
                onAnimateIn: function (data) {
                    //console.log("onAnimateIn", data);
                    $rootScope.currentComponent.animate(data);
                },
                onAnimateOut: function (data) {
                    //console.log("onAnimateOut", data);
                    $rootScope.currentComponent.animate(data);
                },
                onAnimInChange: function (data) {
                    //console.log("onAnimInChange", data);
                    $rootScope.currentComponent.setAnimateIn(data);
                    $rootScope.$apply();
                    $rootScope.currentComponent.animate(data);
                },
                onAnimOutChange: function (data) {
                    //console.log("onAnimOutChange", data);
                    $rootScope.currentComponent.setAnimateOut(data);
                    $rootScope.$apply();
                    $rootScope.currentComponent.animate(data);
                }
            });

            var confXYWH = new ConfXYWH({
                data: { "left": left, "top": top, "width": width, "height": height },
                onChange: function (data) {
                    //console.log(data);
                    $rootScope.currentComponent.setXYWH(data);
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

            // scope.$on("$destroy", function() {
            //     console.log("configCommon销毁");
            // });
        }
    };
}]);

// mainModule.directive('configPosition', function () {
//     return {
//         restrict: 'A',
//         replace: true,
//         template: [
//             '<section class="c-conf-section c-conf-common">',
//                 '<div class="c-conf-row c-conf-row-3">',
//                     '<label class="c-input-label" for="left">位置</label>',
//                     '<div class="c-input-box">',
//                         '<label class="u-label f-mr-9">X轴</label>',
//                         '<input type="text" id="left" class="u-textbox f-mr-40" size="10" ng-model="currentComponent.options.x" />',
//                         '<label class="u-label f-mr-9" for="top">Y轴</label>',
//                         '<input type="text" id="top" class="u-textbox" size="10" ng-model="currentComponent.options.y" />',
//                     '</div>',
//                 '</div>',
//                 '<div class="c-conf-row">',
//                     '<label class="c-input-label" for="width">大小</label>',
//                     '<div class="c-input-box">',
//                         '<label class="u-label f-mr-9">宽</label>',
//                         '<input type="text" id="width" class="u-textbox f-mr-40" size="10" ng-model="currentComponent.options.width" />',
//                         '<label class="u-label f-mr-9">高</label>',
//                         '<input type="text" id="height" class="u-textbox" size="10" ng-model="currentComponent.options.height" />',
//                     '</div>',
//                 '</div>',
//             '</section>'
//         ].join(''),
//         link: function (scope, element, attrs) {

//         }
//     };
// });