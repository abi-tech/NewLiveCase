var tpl_area_toolbtn = [
'<a href="javascript:void(0);" class="u-toolBtn" type="{{ type }}" title="{{ title }}" style="display: block;">',
	'<div class="u-toolBtn-wrap"> <i class="icon-x20 com-img com-img-left" style="background-image: url(&quot;{{ icon }}&quot;);"></i>',
		'<p>{{ text }}</p>',
	'</div>',
	'{{ if list != null }}',
	'<ul class="u-toolBtn-list" style="display: none;">',
		'{{ each list as value i }}',
		'<li class="u-toolBtn-{{ value.type }}">{{ value.text }}</li>',
		'{{ /each }}',
	'</ul>',
	'{{ /if }}',
'</a>'
].join('');

mainModule.directive("navigationArea", ['$rootScope', '$compile', 'pageService', 'editorService',
    function ($rootScope, $compile, pageService, editorService) {
    return {
        restrict: "A",
        templateUrl: "tpls/navigationArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        	var toolBottons = constants.navigationArea.toolBottons;
        	var toolBtnPanel = $(".c-toolBar>.c-toolPanel-left", element);
        	var $nav2Coms = $("#nav2Coms", element);
        	var $nav2effect = $(".u-toolBtn-effect", element);
        	var $nav2music = $(".u-tool-music", element);
        	var $btnSave = $(".c-toolPanel-right.c-nav-right .u-toolBtn:eq(0)", element);
        	var $btnPreview = $(".c-toolPanel-right.c-nav-right .u-toolBtn:eq(1)", element);
        	var $btnRelease = $(".c-toolPanel-right.c-nav-right .u-toolBtn:eq(2)", element);
        	var $btnUndo = $(".c-toolPanel-right:last .u-toolBtn:eq(0)", element);
        	var $btnRedo = $(".c-toolPanel-right:last .u-toolBtn:eq(1)", element);

            var updateModel = function (com) {
                $rootScope.currentPage.components.push(com);
                $rootScope.currentComponent = com;
                $rootScope.$apply();
                $rootScope.componentChanged(com);
            }

        	function initView() {
        		angular.forEach(toolBottons, function (data, index, array) { 
	        		var $toolbtn = $(template.compile(tpl_area_toolbtn)(data));
	        		$toolbtn.insertBefore($nav2Coms);
	        	});
        	}

        	function initEvent() {
                //图片
        		$(".u-toolBtn:eq(0)", toolBtnPanel).on('click', function (e) {
                    //点击弹出图片选择对话框
                    var options = {
                        onChosenEnd: function (item) {
                            var cfg = {};
                            cfg.width = item.options.width;
                            cfg.height = item.options.height;
                            cfg.url = item.options.url;
                            cfg.scale = editorService.editorScale;
                            var com = new Singleimage(cfg);
                            updateModel(com);
                        }
                    };
                    var fileDialog = new FileDialog(options);
                    fileDialog.show();
        		});
                //文本
        		$(".u-toolBtn:eq(1)", toolBtnPanel).on('click', function (e) {
                    var cfg = {};
                    cfg.scale = editorService.editorScale;
                    var com = new Singletext(cfg);
        			updateModel(com);
        		});
                //按钮
        		$(".u-toolBtn:eq(2)", toolBtnPanel).on('click', function (e) {
        			var $ul = $("ul", this);
        			$ul.toggle();
        		});

        		$(".u-toolBtn:eq(2) ul li", toolBtnPanel).on('click', function (e) {
        			var index = $(".u-toolBtn:eq(2) ul li", toolBtnPanel).index(this);
        			var cfg = {};
                    cfg.scale = editorService.editorScale;
                    cfg.funType = index + '';
                    cfg.funMode = index == 1? "icon" : "text";
                    var com = new Externallinks(cfg);
                    updateModel(com);
        		});
                //高级组件
        		$nav2Coms.on('click', function (e) {
        			var dom = $("body>.g-coms");

        			if(dom.hasClass("z-hide")){ 
        				dom.removeClass();
        				dom.addClass("g-coms");
                        $nav2Coms.addClass("z-active");
        			}else{
        				dom.removeClass();
        				dom.addClass("g-coms");
        				dom.addClass("z-hide");
                        $nav2Coms.removeClass("z-active");
        			}
        		});
                //特效
        		$nav2effect.on('click', function (e) {
        			var dom = $("body>.g-coms");
        			alert('nav2effect');
        		});
                //背景音乐
                var bgMusic = new GlobalMusic({ 
                    onChosenEnd: function (data) {
                        if(!data){
                            $("i", $nav2music).removeClass().addClass("icon-x20 icon-x22-nomusic");
                            $("p", $nav2music).removeClass().text("背景音乐");
                        }else{
                            $("i", $nav2music).removeClass().addClass("icon-x20 icon-x22-hasmusic");
                            $("p", $nav2music).addClass("textCarouselClz active").text(data.name);
                        }
                        
                    }
                });
                //背景音乐
        		$nav2music.on('click', function (e) { 
        			bgMusic.show();
        		});
                //保存
        		$btnSave.on('click', function (e) {
        			alert('btnSave');
        		});
                //预览
        		$btnPreview.on('click', function (e) {
        			var $dialog = $compile('<div preview-dialog></div>')(scope);
        			var $cover = $('<div class="g-cover"></div>');
                    
        			$("body").append($cover);
        			$("body").append($dialog);
        			$cover.on("click", function (e) {
        				$cover.remove();
        				$dialog.remove();
        			});
        		});
                //发布
        		$btnRelease.on('click', function (e) {
                    alert("btnRelease");
        		});
                //撤销
        		$btnUndo.on('click', function (e) {
        			console.log($rootScope.currentPage);
        		});
                //恢复
        		$btnRedo.on('click', function (e) {
        			console.log($rootScope.currentComponent);
        		});
        	}

        	initView();
        	initEvent();
        }
    }
}]);

