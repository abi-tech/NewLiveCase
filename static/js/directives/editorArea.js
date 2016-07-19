/**
* 描述：用于表示H5页面
* 功能：设置
**/
/*
// LiveApp slide-page-icon-default
// UpArrow slide-page-icon-up
// DownArrow slide-page-icon-down
<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop"></a></div>
<div ng-repeat="component in currentPage.components" preview="0" editor-area-component></div>
*/
var H5EditorFrame = function (options) {
    var that = this;

    that.defaultOptions = {
        originWidth: 640,
        originHeight: 1040,
        originScale: 1,
        editorWidth: 384,
        editorHeight: 624,
        editorScale: 0.6,
        sliderWidth: 68,
        sliderHeight: 68,
        page: null
    };
    
    that.$html = $([
        '<div id="editorFrame" class="u-page-border page-container u-page-active" bg-layout="center">',
            '<div ng-repeat="component in currentPage.components" preview="0" editor-area-component></div>',
        '</div>'
    ].join(''));

    that.$toolbar = $([
        '<ul class="u-Layer-update-16">',
            '<li class="disable"><span>居左</span></li>',
            '<li class="disable"><span>居右</span></li>',
            '<li class="disable"><span>移到最顶层</span></li>',
            '<li class="disable"><span>上移一层</span></li>',
            '<li class="disable"><span>移到最底层</span></li>',
            '<li class="disable"><span>下移一层</span></li>',
            '<li class="disable"><span>复制</span></li>',
            '<li class="disable"><span>粘贴</span></li>',
            '<li class="last disable"><span>删除</span></li>',
        '</ul>'
    ].join(''));

    that.$slider = $('<div></div>');

    that.$bgImage = $([
        '<div class=" page-bg-div" style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 1; top: 0px; left: 0px;">',
            '<img style="position: absolute; width: auto; height: 100%; left: -140.288px; top: 0px;" />',
        '</div>'
    ].join(''));

    that.setPage = function (page) {
        that.page = page;
    }

    that.setOptions = function (options) {
        delete that.options;
        that.options = $.extend({}, that.defaultOptions, options);
        $.extend(that, that.options);
    }

    that.getOptions = function () {
        var obj = $.parseJSON(JSON.stringify(that));
        delete obj.defaultOptions;
        delete obj.options;
        delete obj.$html;
        delete obj.$toolbar;
        delete obj.$slider;
        return obj;
    }

    that.animate = function (animation) { 
        $("#editorFrame .u-comChoose").removeClass("u-comChoose");
        animation = animation? animation : that.page.animation;
        if(!animation) { 
            console.log("animation is undefined");
            return;
        }
        var express = animation.effect + " " + animation.duration + "s backwards";
        var end = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        that.$html.css("animation", express).one(end, function () {
            that.$html.css("animation", "none");
        });
    }

    that.setBackgroundImage = function (image) {
        var width = image.width / image.height * that.editorHeight;
        var left = (that.editorWidth - width) / 2;
        that.$bgImage.find("img").css("left", left);
        that.$bgImage.find("img").attr("src", image.url);
        that.$html.append(that.$bgImage);
    }

    that.setBackgroundColor = function (color) {
        that.$html.css("background-color", color);
    }

    that.removeBackgroundImage = function () {
        that.$bgImage.remove();
    }

    that.initData = function () {
        var tempHeight = $(window).height() - 120 - 40;
        if (tempHeight < that.editorHeight) {
            that.editorScale = tempHeight / that.originHeight;
            that.editorWidth = that.originWidth * that.editorScale;
            that.editorHeight = that.originHeight * that.editorScale;
        }
    }

    that.initView = function () {
        that.$html
            .css("font-size",  that.editorScale + "rem")
            .css("margin-left", -that.editorWidth / 2)
            .css("margin-top", -that.editorHeight / 2 - 20)
            .css("width", that.editorWidth)
            .css("height", that.editorHeight);

        that.$slider
            .css("margin-left", -that.sliderWidth * that.editorScale / 2)
            .css("margin-top", -that.sliderHeight * that.editorScale / 2)
            .css("width", that.sliderWidth * that.editorScale)
            .css("height", that.sliderHeight * that.editorScale);

        if(that.page){
            that.$slider.removeClass();
            that.$slider.addClass("slide-page-icon");
            that.$slider.addClass(that.page.slideIcon.icon);
        }
        that.setBackgroundImage(that.page.bgImage);
        that.setBackgroundColor(that.page.bgColor);

        that.$html.append(that.$toolbar);
        that.$html.append(that.$slider);
    }

    that.initEvent = function () {
        $("li", that.$toolbar).on("click", function(e) {
            alert($(this).text());
        });

        that.$html.on('onLoad',function(){
            that.animate(that.page.animation);
            return false;          
        });
    }

    that.init = function () {
        that.setOptions(options);
        that.initData();
        that.initView();
        that.initEvent();
    }

    that.init();
    //that.animate(that.page.animation);
}

mainModule.directive("editorArea", ['$rootScope', '$compile', 'pageService', 'editorService',
    function ($rootScope, $compile, pageService, editorService) {
    return {
        restrict: "A",
        template: '<div class="g-editor"><section class="m-editor"></section></div>',
        replace: true,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$render = function () {
                var viewValue = ngModelController.$viewValue;

                $(".m-editor", element).empty();
                var frame = new H5EditorFrame({ page: viewValue});
                console.log('previewArea', scope, viewValue);

                var $newScope = scope.$new();
                var $html = $compile(frame.$html)($newScope);
                $(".m-editor", element).append($html);

                frame.$html.trigger('onLoad');
            }

            // var $newScope = scope.$new();
            // var frame = new H5EditorFrame({ page: pageService.getCurrentPage() });
            // var $html = $compile(frame.$html)($newScope);
            // $(".m-editor", element).append($html);
        }
    }
}]);

mainModule.directive("editorAreaComponent", function () {
    return {
        restrict: 'A',
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {
            element.replaceWith(scope.component.$html);
        }
    }
});