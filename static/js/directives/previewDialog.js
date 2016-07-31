mainModule.directive("previewDialog", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/previewDialog.html?t=" + new Date(),
        replace: true,
        link: function (scope, element, attrs) {
            var bgMusic = window.bgMusic;
            
        	var obj = angular.fromJson(angular.toJson(pageService.pages));
            $.each(obj, function (i, iNode) {
                var temp = [];

                $.each(iNode.components, function (j, jNode) {
                    temp.push(jNode.options);
                });

                iNode.components.length = 0;

                $.each(temp, function (j, jNode) {
                    iNode.components.push(jNode);
                })
            });
            
            console.log(obj);
            var $iframe = $("iframe", element);
            var $btnPrev = $(".m-page-nav div.prev", element);
            var $btnNext = $(".m-page-nav div.next", element);
            var $copyLink = $("#copyPreviewLink", element);
            var $linkUrl = $("#previewLinkUrl", element);
            var $closeIcon = $(".close-icon", element);
            var $btnClose = $(".cancel-btn", element);
            var $btnRelease = $(".ok-btn", element);
            var $cover = $('<div class="g-cover"></div>');

            ZeroClipboard.config({ swfPath: '/static/plugins/zeroclipboard/2.2.0/ZeroClipboard.swf' });
            var client = new ZeroClipboard( $copyLink[0] );

            var previewUrl = window.location.origin + "/preview.html";
            
            function close() {
                $cover.remove();
                element.remove();
                scope.$destroy();
            }

            var initView = function () {
                $linkUrl.text(previewUrl);
                $('#qrcode', element).qrcode({ width: 183,height: 183, text: previewUrl });
                $("body").append($cover);
            }
            
            var initEvent = function () {
                $iframe[0].onload = function () {
                    $iframe[0].contentWindow.liveApp.caseData.isPreview = true;
                    $iframe[0].contentWindow.liveApp.caseData.bgMusic = bgMusic;
                    $iframe[0].contentWindow.liveApp.caseData.pages = obj;
                    $iframe[0].contentWindow.initView();
                }

                $btnPrev.on("click", function (e) {
                    $iframe[0].contentWindow.moveUp();
                });

                $btnNext.on("click", function (e) {
                    $iframe[0].contentWindow.moveDown();
                });
                
                $cover.on("click", function (e) {
                    e.stopPropagation();
                    close();
                });

                $closeIcon.on("click", function (e) {
                    e.stopPropagation();
                    close();
                });

                $btnClose.on("click", function (e) {
                    e.stopPropagation();
                    close();
                });

                $btnRelease.on("click", function (e) {
                    e.stopPropagation();
                    close();
                });

                client.on( "copy", function (event) {
                    var clipboard = event.clipboardData;
                    clipboard.setData("text/plain", previewUrl);
                });

                client.on("aftercopy", function(event) {
                    alert("Copied text to clipboard: " + event.data["text/plain"] );
                });
            }

            initView();
            initEvent();
        }
    }
}]);