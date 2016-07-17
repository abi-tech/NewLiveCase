mainModule.directive("previewDialog", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/previewDialog.html?t=" + new Date(),
        replace: true,
        link: function (scope, element, attrs) {
        	var obj = angular.fromJson(angular.toJson(pageService.pages));

            var $iframe = $("iframe", element);
            var $btnPrev = $(".m-page-nav div.prev", element);
            var $btnNext = $(".m-page-nav div.next", element);

            $iframe[0].onload = function () {
                $iframe[0].contentWindow.liveApp.caseData.pages = obj;
                $iframe[0].contentWindow.initView();
            }

            $btnPrev.on("click", function (e) {
            	$iframe[0].contentWindow.moveUp();
            });

            $btnNext.on("click", function (e) {
            	$iframe[0].contentWindow.moveDown();
            });
        }
    }
}]);