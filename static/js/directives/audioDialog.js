mainModule.directive("audioDialog", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/audioDialog.html",
        replace: true,
        link: function (scope, element, attrs) { 
        	var positions = $(".audio-position-select ul li", element);
            var $btnAdd = $(".audio-btns a:eq(0)", element);
            var $btnPlay = $(".audio-btns a:eq(1)", element);
            var $btnRemove = $(".audio-btns a:eq(2)", element);

        	function initView(){
        		positions.on('click', function (e) {
                    var index = positions.index($(this));
                    var $i = $("i:eq(0)", this);
                    $("i:eq(0)", positions).removeClass("icon-selected").css("display", "none");
                    $i.addClass("icon-selected").css("display", "inline");
                });
        	}

            function initEvent() {
                $btnAdd.on('click', function (e) {
                    $btnAdd.text("更换");
                    $btnPlay.removeClass("icon-music-none");
                    $btnPlay.removeClass("icon-play");
                    $btnPlay.addClass("icon-pause");
                    $btnPlay.text("暂停");
                });

                $btnPlay.on('click', function (e) {
                    $btnPlay.removeClass("icon-music-none");
                    $btnPlay.removeClass("icon-pause");
                    $btnPlay.addClass("icon-play");
                    $btnPlay.text("试听");
                });

                $btnRemove.on('click', function (e) {
                    $btnPlay.removeClass("icon-play");
                    $btnPlay.removeClass("icon-pause");
                    $btnPlay.addClass("icon-music-none");
                    $btnAdd.text("添加");
                    $btnPlay.text("试听");
                });
            }

        	initView();
            initEvent();
        }
    }
}]);