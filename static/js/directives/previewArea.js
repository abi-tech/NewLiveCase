// mainModule.directive("previewArea", ['$timeout', '$log', '$compile', 'pageService', function ($timeout, $log, $compile, pageService) {
//     return {
//         restrict: "A",
//         templateUrl: "tpls/previewArea.html",
//         replace: true,
//         controller: function($scope, $element){  
//             $scope.pages = pageService.pages;

//         },
//         link: function (scope, element, attrs) {
//         	//scope.pages = pageService.pages;
//         	//console.log(scope.pages); console.log(2);
//         	console.log($("section.m-pv", element).html());
//         },
//         compile: function(element, attributes) {  
//             return {  
//                 pre: function preLink(scope, element, attributes) {  
//                     console.log($("section.m-pv", element)); 
//                 },  
//                 post: function postLink(scope, element, attributes) {  
//                     console.log($("section.m-pv", element));
//                 }  
//             };  
//         }  
//     }
// }]);

mainModule.directive("previewArea", ['$rootScope', '$timeout', '$log', '$compile', 'pageService', function ($rootScope, $timeout, $log, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/previewArea.html",
        replace: true,
        scope: false,
        link: function (scope, element, attrs) {
            var $btnAdd = $(".c-plus", element);

            $btnAdd.on('click', function (e) {
                //console.log($("#editorFrame .c-c-container").length);
                //$("#editorFrame .c-c-container").remove();

                pageService.add(scope.pages.length);

                var idx = scope.pages.length - 1;

                pageService.currentPageIndex = idx;

                $rootScope.setCurrentPage(idx, pageService.pages[idx]);
                $rootScope.$apply();
                //console.log(scope, $rootScope);

                $("section.m-pv>section.c-ct", element).removeClass("c-ct-active");
                $("section.m-pv>section.c-ct:eq(" + idx + ")", element).addClass("c-ct-active");
            });
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
            });
        }
    }
}]);