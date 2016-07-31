mainModule.directive("pageBackgroundImage", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
            '<div class="jcrop-panel-header c-background-btn">',
                '背景设置',
                '<div class="info-pop">',
                    '<div class="bg"></div>',
                    '<div class="info">最佳尺寸：640x1040(px)</div><i></i>',
                '</div>',
            '</div>'
        ].join(''),
        replace: true,
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

            var updateModel =  function (val) {
                $rootScope.currentPage.bgImage = val;
                $rootScope.currentPage.css["background-image"] = val? 'url(\'' + val.url + '\')' : "none";
                $rootScope.$apply();
            }

            var $parent = element.parent();
            var chooseBackgroundImage = function (e) {
                var options = {
                    onChosenEnd: function (item) {
                        updateModel(item.options);
                        initView();
                    }
                };
                var fileDialog = new FileDialog(options);
                fileDialog.show();
                return false;
            };

            var initView = function () {
                var bgColor = $rootScope.currentPage.bgColor;
                var bgImage = $rootScope.currentPage.bgImage;
                if(!bgImage) return;

                var $bgImage = $(tpl);
                var width = bgImage.width / bgImage.height * $("#editorFrame").height();
                var left = ($("#editorFrame").width() - width) / 2;
                $bgImage.find("img").css("left", left);
                $bgImage.find("img").attr("src", bgImage.url);
                $("#editorFrame .page-bg-div").remove();
                $("#editorFrame").append($bgImage);

                $(".u-image-wrap", $chosenView)
                    .css("background-color", bgColor)
                    .css("background-image", "url('" + bgImage.url + "')");

                $(".jcrop-panel-header,.c-background-layer", $parent).remove();
                $parent.prepend($chosenView);

                $(".change-btn-image", $chosenView).on("click", chooseBackgroundImage);

                $(".delete", $chosenView).on("click", function (e) {
                    $("#editorFrame .page-bg-div").remove();
                    $(".jcrop-panel-header,.c-background-layer", $parent).remove();
                    $parent.prepend(element);

                    updateModel(null);
                    initEvent();
                    return false;
                });
            }

            var initEvent = function () {
                element.on("click", chooseBackgroundImage);
            }

            initView();
            initEvent();

            // scope.$on("$destroy", function() {
            //     console.log("pageBackgroundImage销毁");
            // });
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
                        '<input class="f-point" type="text" style="color: rgb(255, 255, 255); background: rgb(255, 255, 255);">',
                    '</li>',
                '</ul>',
            '</div>'
        ].join(''),
        replace: true,
        link: function (scope, element, attrs) {
            var updateModel = function (val) {
                $rootScope.currentPage.bgColor = val? val : "rgb(255, 255, 255)";
                $rootScope.currentPage.css["background-color"] = $rootScope.currentPage.bgColor;
                $rootScope.$apply();

                $("#editorFrame").css("background-color", $rootScope.currentPage.bgColor);
            }

            $("input.f-point", element).colorpicker({
                onChange: function(color){
                    updateModel(color);
                }
            });

            var initEvent = function () {
                $("li", element).on("click", function (e) {
                    var color = $(this).css("background-color");
                    updateModel(color);
                });
            }

            initEvent();

            // scope.$on("$destroy", function() {
            //     console.log("pageBackgroundColor销毁");
            // });
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
        scope:{},
        link: function (scope, element, attrs) {
            scope.icons = constants.pageIconList;
            scope.selected = $rootScope.currentPage.slideIcon;

            var updateModel = function (val) {
                $rootScope.currentPage.slideIcon = val;

                $("#editorFrame .slide-page-icon")
                    .removeClass()
                    .addClass("slide-page-icon " + val.icon);
            }

            scope.$watch("selected", function (newValue, oldValue) {
                if (newValue == oldValue) return;
                
                updateModel(newValue);
            });
            // scope.$on("$destroy", function() {
            //     console.log("pageSliderIcon销毁");
            // })
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
        link: function (scope, element, attrs) {
            scope.animations = constants.pageAnimationList;
            scope.selected = $rootScope.currentPage.animation;

            updateModel = function (val) {
                $rootScope.currentPage.animation = val;
            }

            scope.chosen = function(animation) {
                scope.selected = animation;
                updateModel(animation); 
                //console.log("scope.chosen scope.chosen ");
                $("#editorFrame").trigger("onLoad");
            }

            // scope.$on("$destroy", function() {
            //     console.log("pageSlideAnimation销毁");
            // });
        }
    }
}]);

mainModule.directive("pageConfigother", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: [
        '<div class="c-conf-row f-mt-30">',
            '<div class="f-fix f-mb-20">',
                '<label class="f-float-l f-mt-2" style="color:#333">应用到所有页面</label>',
            '</div>',
            '<hr>',
            '<div class="f-fix f-mt-20" style="position: relative">',
                '<label class="f-float-l f-mt-2" style="color:#333">锁定翻页</label>',
                '<div class="tips-area">',
                    '<div class="info">',
                        '<div class="info-pop" style="top: -61px;height: 38px;padding-top: 10px;width: 205px">',
                            '锁定后该页将无法继续翻页，<br>可添加“跳转按钮”跳转至其他页面。<i></i>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<hr>',
            '<div class="f-fix f-mt-20 f-mb-15" style="position: relative">',
                '<label class="f-float-l f-mt-2" style="color:#333">自动翻页</label>',
                '<div class="tips-area">',
                    '<div class="info">',
                        '<div class="info-pop" style="top: -80px;height: 57px;padding-top: 10px">',
                            '1、该页面动画自动播放完毕后，并自动翻至下一页；<br>2、自动播放时，点击该页面即可停止自动播放。<i></i>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="c-conf-row">',
                '<label class="c-input-label" style="color:#333">翻页时间</label>',
                '<div class="c-input-box"></div>',
            '</div>',
        '</div>'
        ].join(''),
        replace: true,
        link: function (scope, element, attrs) {
            var switcherApply = new Switcher({ val: $rootScope.currentPage.applyAllPages, onChange: onApplyChange });
            var switcherLock = new Switcher({ val: $rootScope.currentPage.lockTurnPage, onChange: onLockChange });
            var switcherAuto = new Switcher({ val: $rootScope.currentPage.autoTurnPage, onChange: onAutoChange });
            var sliderAutoDelay = new Slider({ val: $rootScope.currentPage.autoTurnPageDelay, min: 0, max: 300, step: 0.01, onChange: onAutoDelayChange });

            var $row1 = $("div.f-fix:eq(0)", element);
            var $row2 = $("div.f-fix:eq(1)", element);
            var $row3 = $("div.f-fix:eq(2)", element);
            var $row4 = $(".c-conf-row", element);

            function onApplyChange(data) {
                $rootScope.currentPage.applyAllPages = data;
            }
            function onLockChange(data) {
                $rootScope.currentPage.lockTurnPage = data;
            }
            function onAutoChange(data) {
                toggle(data);
                $rootScope.currentPage.autoTurnPage = data;
            }
            function onAutoDelayChange(data) {
                $rootScope.currentPage.autoTurnPageDelay = data;
            }

            function toggle(data) {
                if (data) {
                    $row4.show();
                }else{
                    $row4.hide();
                }
            }

            $row1.append(switcherApply.$html);
            $row2.append(switcherLock.$html);
            $row3.append(switcherAuto.$html);
            $row4.find(".c-input-box").append(sliderAutoDelay.$html);

            toggle($rootScope.currentPage.autoTurnPage);

            scope.$on("$destroy", function() {
                console.log("pageConfigother销毁");
            });
        }
    }
}]);





