var PreviewListBuilder = function (options) {
    var that = this;

    var defaultOptions = {
        pages: null
    };

    that.$html = $([
        '<section class="m-pv">',
            '<section class="c-ct" draggable="true" style="margin-bottom: 0px; margin-top: 0px;">',
                '<div class="close icon-x22 icon-x22-close"></div>',
                '<div class="copy icon-x14 icon-x14-copy" title="复制"></div>',
                '<div class="up"></div>',
                '<div class="down"></div>',
                '<nav class="nav">{{ $index + 1 }}</nav>',
                '<div class="show" bg-layout="tensile" style="background-color: rgb(255, 255, 255);">',
                    '<div class="com-preview"><div></div></div>',
                '</div>',
            '</section>',
            '<section class="c-plus">',
                '<div class="icon-x48 plus">+</div>',
                '<div class="text">增加一页</div></section>',
            '<section class="c-plus-bg"></section>',
        '</section>'
    ].join(''));

    that.init = function (argument) {
        $(".c-ct", that.$html).attr("ng-repeat", "page in pages");
        $(".c-ct", that.$html).attr("ng-class", "{'c-ct-active': page.active}");
        $(".c-ct", that.$html).attr("ng-click", "click($index)");
        $(".close", that.$html).attr("ng-click", "close($index, $event)");
        $(".copy", that.$html).attr("ng-click", "copy($index, $event)");
        $(".up", that.$html).attr("ng-click", "up($index, $event)");
        $(".down", that.$html).attr("ng-click", "down($index, $event)");
        $(".com-preview>div", that.$html).attr("page-component", "");
        $(".com-preview>div", that.$html).attr("mode", "view");
        $(".com-preview>div", that.$html).attr("ng-repeat", "component in page.components");
        $(".c-plus", that.$html).attr("ng-click", "add()");
    }
    $.extend(true, {}, defaultOptions, options);

    that.init();
}

mainModule.directive("previewArea", ['$rootScope', '$timeout', '$log', '$compile', 'pageService', function ($rootScope, $timeout, $log, $compile, pageService) {
    return {
        restrict: "A",
        template: '<div class="g-preview"><section class="pv-container"></section></div>',
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            scope.pages = pageService.pages;

            scope.click = function (index) {
                active(index);
                $rootScope.pageChanged(index);
                $("#editorFrame").trigger("onLoad");
                return false;
            }

            scope.close = function (index, $event) {
                var next = 0; 

                if(index == 0){
                    next = 0;
                }else if(pageService.pages[index].active){
                    var prev = index - 1;
                    next = prev < 0? 0 : prev;
                }
                pageService.delete(index);

                if (pageService.pages.length == 0) {
                    pageService.add();
                }
                active(next);
                $rootScope.pageChanged(next);
                $event.stopPropagation();
            }

            scope.copy = function (index, $event) {
                pageService.copy(index);
                active(index + 1);
                $rootScope.pageChanged();
                $event.stopPropagation();
            }

            scope.up = function (index, $event) {
                if(index == 0) return;

                pageService.up(index);
                $event.stopPropagation();
            }

            scope.down = function (index, $event) {
                if(index == pageService.pages.length - 1) return;

                pageService.down(index);
                $event.stopPropagation();
            }

            scope.add = function () {
                pageService.add();
                active(pageService.pages.length - 1);
                $rootScope.pageChanged(pageService.pages.length - 1);
            }

            var init = function () {
                var builder = new PreviewListBuilder();
                var $html = $compile(builder.$html)(scope);
                $(".pv-container", element).append($html);
            }

            var active = function (index) {
                for (var i = 0; i < pageService.pages.length; i++) {
                    pageService.pages[i].active = false;
                }

                pageService.pages[index].active = true;
            }
            
            init();
            active(0);
            // var $btnAdd = $(".c-plus", element);

            // $btnAdd.on('click', function (e) {
            //     //console.log($("#editorFrame .c-c-container").length);
            //     //$("#editorFrame .c-c-container").remove();

            //     pageService.add(scope.pages.length);

            //     var idx = scope.pages.length - 1;

            //     pageService.currentPageIndex = idx;
            //     console.log("pageService.currentPageIndex", pageService.currentPageIndex);
            //     $rootScope.setCurrentPage(idx, pageService.pages[idx]);
            //     $rootScope.$apply();
            //     //console.log(scope, $rootScope);

            //     $("section.m-pv>section.c-ct", element).removeClass("c-ct-active");
            //     $("section.m-pv>section.c-ct:eq(" + idx + ")", element).addClass("c-ct-active");

            //     $rootScope.pageChanged(idx);
            // });
        } 
    }
}]);

var tpl_preview_page = [
'<section ng-class="($index == currentIndex? \'c-ct c-ct-active\' : \'c-ct\')" style="margin-bottom: 0px; margin-top: 0px;">',
	'<div class="close icon-x22 icon-x22-close"></div>',
	'<div class="copy icon-x14 icon-x14-copy" title="复制"></div>',
	'<div class="up"></div>',
	'<div class="down"></div>',
	'<nav class="nav">{{ $index + 1 }}</nav>',
	'<div class="show" ng-style="page.style">',
		'<div class="com-preview"></div>',
	'</div>',
'</section>'
].join('');

mainModule.directive("previewPage", ['$rootScope', '$log', 'pageService', 'editorService',
    function ($rootScope, $log, pageService, editorService) {
    return {
        restrict: "A",
        template: tpl_preview_page,
        replace: true,
        link: function (scope, element, attrs) {
        	var $btnClose = $(".close", element);
        	var $btnCopy = $(".copy", element);
        	var $btnUp = $(".up", element);
        	var $btnDown = $(".down", element);
        	var $nav = $(".nav", element);

        	$btnClose.on('click', function (e) {
                e.stopPropagation();

        		pageService.delete(scope.$index);
        		scope.$apply();

                element.siblings().removeClass("c-ct-active");
                $(".g-preview section.m-pv>section.c-ct:eq(0)").addClass("c-ct-active");
                scope.setCurrentPage(0, pageService.pages[0]);
        	});

        	$btnCopy.on('click', function (e) {
                e.stopPropagation();
        		scope.copyPage(scope.$index);
                scope.$apply();

                element.siblings().removeClass("c-ct-active");
                element.addClass("c-ct-active"); console.log(scope, $rootScope);
        	});

        	$btnUp.on('click', function (e) {
                e.stopPropagation();
        		pageService.moveUp(scope.$index); console.log(scope, $rootScope);
                scope.$apply();

                element.siblings().removeClass("c-ct-active");
                element.addClass("c-ct-active");
        	});

        	$btnDown.on('click', function (e) {
                e.stopPropagation();
        		pageService.moveDown(scope.$index); console.log(scope, $rootScope);
                scope.$apply();

                element.siblings().removeClass("c-ct-active");
                element.addClass("c-ct-active");
        	});

            element.on('click', function (e) {
                //$("#editorFrame .c-c-container").remove();
                element.siblings().removeClass("c-ct-active");
                element.addClass("c-ct-active");

                var idx = scope.$index; 
                pageService.currentPageIndex = idx; 
                scope.setCurrentPage(idx, pageService.pages[idx]);
                scope.$apply();

                $rootScope.pageChanged(idx);
            });
        }
    }
}]);

mainModule.directive("pageComponent", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {
            var $html = $compile(scope.component.$view)(scope);
            element.replaceWith($html);
        }
    }
}]);