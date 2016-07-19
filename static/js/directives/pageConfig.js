mainModule.directive("uiConfigSection", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: '<section class="c-conf-section c-conf-triggerSection z-expand"><div ng-transclude></div></section>',
        transclude: true,
        replace: true,
        link: function (scope, element, attrs) {

        }
    }
}]);

mainModule.directive("pageBackgroundImage", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
            '<div class="jcrop-panel-header c-background-btn">',
                '背景设置',
                '<div class="info-pop">',
                    '<div class="bg"></div>',
                    '<div class="info">最佳尺寸：640x1040(px)</div> <i></i>',
                '</div>',
            '</div>'
        ].join(''),
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            var tpl = $([
                '<div class="page-bg-div" style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 1; top: 0px; left: 0px;">',
                    '<img style="position: absolute; width: auto; height: 100%; left: -140.288px; top: 0px;" />',
                '</div>'
            ].join(''));

            var $chosenView = $([
                '<div class="c-background-layer" style="margin:30px 0 0 20px;width:280px;background-color:white;">',
                    '<div class="c-conf-row">',
                        '<div class="u-image-wrap f-p-0 " style="background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;"></div>',
                    '</div>',
                    '<ul class="u-layer-change-btn-wrap">',
                        '<li style="color:#333;" class="change-btn-image">',
                            '更换背景',
                            '<div class="info-pop">',
                                '<div class="bg"></div>',
                                '<div class="info">最佳尺寸：640x1040(px)</div>',
                                '<i></i>',
                            '</div>',
                        '</li>',
                        '<li class="delete">移除</li>',
                    '</ul>',
                '</div>'
            ].join('')); 

            var $parent = element.parent();
            var chooseBackgroundImage = function (e) {
                console.log("chooseBackgroundImage");
                var options = {
                    onChosenEnd: function (item) {
                        var page = pageService.getCurrentPage();
                        page.bgImage = item.options;

                        var $bgImage = $(tpl);
                        var width = item.options.width / item.options.height * $("#editorFrame").height();
                        var left = ($("#editorFrame").width() - width) / 2;
                        $bgImage.find("img").css("left", left);
                        $bgImage.find("img").attr("src", item.options.url);
                        $("#editorFrame .page-bg-div").remove();
                        $("#editorFrame").append($bgImage);

                        $(".u-image-wrap", $chosenView).css("background-color", page.bgColor)
                            .css("background-image", "url('" + page.bgImage.url + "')");

                        $(".jcrop-panel-header,.c-background-layer", $parent).remove();
                        $parent.prepend($chosenView);

                        $(".change-btn-image", $chosenView).on("click", chooseBackgroundImage);

                        $(".delete", $chosenView).on("click", function (e) {
                            $("#editorFrame .page-bg-div").remove();
                            $(".jcrop-panel-header,.c-background-layer", $parent).remove();
                            $parent.prepend(element);
                            initEvent();
                            return false;
                        });
                        //initEvent();
                    }
                };
                var fileDialog = new FileDialog(options);
                fileDialog.show();
                return false;
            };

            var initEvent = function () {
                element.on("click", chooseBackgroundImage);
            }



            initEvent();
        }
    }
}]);

mainModule.directive("pageBackgroundColor", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
            '<div class="color-list f-fix f-mt-21 f-ml-18">',
                '<ul>',
                    '<li style="width:31px;height:31px;" class="nonecolor f-float-l f-point"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(255, 255, 255);"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(153, 153, 153);"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(0, 0, 0);"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(126, 211, 33);"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(80, 227, 194);"></li>',
                    '<li class="f-float-l f-point f-ml-7" style="background-color: rgb(248, 231, 28);"></li>',
                    '<li class="f-float-l f-ml-5 colorpick f-point">',
                    '<input class="f-point" type="text" id="page_backgroundColor" data-duplex-changed="initCp" style="color: rgb(255, 255, 255); background: rgb(255, 255, 255);"></li>',
                '</ul>',
            '</div>'
        ].join(''),
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            var initEvent = function () {
                $("li", element).on("click", function (e) {
                    var page = pageService.getCurrentPage();
                    var color = $(this).css("background-color");
                    page.bgColor = color? color : "rgb(255, 255, 255)";

                    $("#editorFrame").css("background-color", page.bgColor);
                });
            }

            initEvent();
        }
    }
}]);

mainModule.directive("pageSliderIcon", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
            '<div class="f-fix slide-page">',
                '<label class="f-float-l f-mt-2" style="color:#333;line-height: 24px">翻页图标</label>',
                '<select class="u-select c-span-7 slide-page-select" ng-model="selected" ng-options="x.name for x in icons"></select>',
                '<span class="slide-page-line"></span>',
            '</div>'
        ].join(''),
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            scope.icons = pageService.getCurrentPage().icons;
            scope.selected = pageService.getCurrentPage().slideIcon;

            scope.$watch("selected", function (newValue, oldValue) {
                if (newValue == oldValue) return;

                pageService.getCurrentPage().slideIcon = newValue;
            });
        }
    }
}]);

mainModule.directive("pageSlideAnimation", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
            '<div class="c-conf-panel f-mb-10 f-mt-20">',
                '<ul class="u-chooseList-large">',
                    '<li ng-repeat="animation in animations" ng-click="chosen(animation)">',
                        '<a style="background-color:#f8f8f8" href="javascript:void(0);" class="u-image-wrap f-p-0 f-wh-80" ng-class="{\'z-active\': (animation == selected)}">',
                            '<div class="u-image-large f-wh-80 {{ animation.type }}"></div>',
                        '</a>',
                        '<p>{{ animation.name }}</p>',
                    '</li>',
                '</ul>',
            '</div>'
        ].join(''),
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            scope.animations = pageService.getCurrentPage().animations;
            scope.selected = pageService.getCurrentPage().animation;

            scope.chosen = function(animation) {
                scope.selected = animation;
                pageService.getCurrentPage().animation = animation;
                $("#editorFrame").trigger("onLoad");
            }
        }
    }
}]);
