mainModule.directive("editorArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/editorArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        	//原始尺寸
        	$rootScope.originWidth = 640;
            $rootScope.originHeight = 1040;
            $rootScope.originScale = 1;
            //编辑器预览尺寸
            $rootScope.editorWidth = 384;
            $rootScope.editorHeight = 624;
            $rootScope.editorScale = 0.6;
            //根据实际用户屏幕尺寸计算编辑器的尺寸
            var tempHeight = $(document).height() - 120 - 40;

            if (tempHeight < $rootScope.editorHeight) {
                $rootScope.editorScale = tempHeight / $rootScope.originHeight;
                $rootScope.editorWidth = $rootScope.originWidth * $rootScope.editorScale;
                $rootScope.editorHeight = $rootScope.originHeight * $rootScope.editorScale;
            }

            $(".m-editor", element).on('click', function(){
                scope.currentComponent = null;
                $(".c-c-container").removeClass("u-comChoose");
                scope.$apply();
            });

            $("#editorFrame")
                .css("font-size",  $rootScope.editorScale + "rem")
                .css("margin-left", -$rootScope.editorWidth / 2)
                .css("margin-top", -$rootScope.editorHeight / 2 - 20)
                .css("width", $rootScope.editorWidth)
                .css("height", $rootScope.editorHeight);
        }
    }
}]);