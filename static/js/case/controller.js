/**
* 描述：显示页面的容器 集成fullpage.js插件
* 功能：添加页面 添加组件 切换页面
**/
var H5 = function () {
	var that = this;
	this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="pages" id="' + this.id + '">').hide();
    this.pages = [];
    this.pageCfg = [];
    $('body').append(this.el);

    var st;
    var animList = [];
    var index = 0;
    var timer = $.timer(function() {
        if (animList.length == index) {
            that.resetTimer();
            return;
        }
        var curr = new Date().getTime();
        var span = curr - st;
        var com = animList[index];
        var animateIn = com.animateIn;
        var time = animateIn.delay * 1000; 
        if (time <= span) {
            var $view = $('[data-id="' + com.id + '"]');
            $view.show();
            comUtils.animate("组件动画", $view, animateIn);
            index++;
        }
    }, 50, true);

    this.resetTimer = function () {
        index = 0;
        st = 0;
        animList.length = 0;
        timer.stop();
    }
    /**
    * 描述：添加页面
    * 参数：options H5Page的页面参数
    **/
    this.addPage = function(options){
        var page = $('<div class="page section">');
        var bgImage = $('<img style="position: absolute; width: auto; height: 100%; left: 0px; top: 0px;">');
        var slideIcon = $('<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop u-guideTop-' + options.slideIcon.value + '"></a></div>');
        
        page.css("background-color", options.bgColor);
        if(options.bgImage){
            bgImage.attr("src", options.bgImage.url);
            page.append(bgImage);
        }
        page.append(slideIcon);
        this.el.append(page);
        this.pages.push(page);
        this.pageCfg.push(options);

        slideIcon.on("click", function (e) {
            that.moveDown();
        });
        return this;
    }

    /**
    * 描述：添加页面组件
    * 参数：options H5ComponentBase 子类的组件参数
    **/
    this.addComponent = function(options){
        var component; 
        var page = this.pages.slice(-1)[0];

        options.mode = "2";
        options.scale = 1;
        switch(options.type){
            case 'singleimage':
                component = new Singleimage(options);
            	break;
            case 'singletext':
                component = new Singletext(options);
            	break;
            case 'externallinks':
                component = new Externallinks(options);
            	break;
        }
        options.id = component.id;
        component.$view.attr("data-id", component.id);
        page.append(component.$view);
        return this;
    }

    /**
    * 描述：切换至上一页
    **/
    this.moveUp = function () {
    	this.el.fullpage.moveSectionUp();
    }

    /**
    * 描述：切换至下一页
    **/
    this.moveDown = function () {
    	this.el.fullpage.moveSectionDown();
    }

    /**
    * 描述：切换至某一页
    * 参数：index 页码
    **/
    this.moveTo = function (index) {
    	this.el.fullpage.moveTo(index);
    }

    this.initMusic = function () {
        console.log("背景音乐加载", liveApp.caseData.bgMusic);
        var coffee = new H5BGMusic(liveApp.caseData.bgMusic);
        //$("#coffee").("start");
        
    }
    /**
    * 描述：注册fullpage.js 插件功能
    * 主要实现翻页动画 及 状态标记修改过
    **/
    this.loader = function(){
        this.el.fullpage({
            onLeave: function(index, nextIndex, direction){ //console.log("onLeave", index, nextIndex, direction);
                that.resetTimer();

                var currPage = that.pages[index - 1];
                var nextPage = that.pages[nextIndex - 1];
                var nextPageCfg = that.pageCfg[nextIndex - 1];

            	currPage.removeClass("z-current");
            	currPage.addClass("z-move");
            	nextPage.addClass("z-current");
            	nextPage.addClass("z-move");
                //页面动画
                var animation = nextPageCfg.animation;

                $.each(nextPageCfg.components, function (i, n) { 
                    if(n.animateIn){
                        $('[data-id="' + n.id + '"]', nextPage).hide();
                        animList.push(n);
                    }
                });

                animList.sort(function (a, b) {
                    return a.animateIn.delay - b.animateIn.delay;
                });

                comUtils.animate("页面动画", nextPage, animation, function () {
                    st = new Date().getTime();
                    timer.play();
                    // $.each(nextPageCfg.components, function (i, n) {
                    //     if(n.options.animateIn){
                    //         var $view = $('[data-id="' + n.id + '"]', nextPage);
                    //         var animateIn = n.options.animateIn;  
                    //         $view.show();
                    //         comUtils.animate("组件动画", $view, animateIn);
                    //     }
                    // });
                });
            },
            afterLoad: function(anchorLink, index){ //console.log("afterLoad", anchorLink, index);
             	//that.pages[index - 1].find('.h5_component').trigger('onLoad');
             	//that.pages[index - 1].find('.h5_component').show();
             	$(this).siblings().removeClass("z-move");
             	$(this).removeClass("z-move");
            },
            afterRender: function () {
                var currPage = that.pages[0];
                var currPageCfg = that.pageCfg[0];
                var animation = currPageCfg.animation;

                $.each(currPageCfg.components, function (i, n) { 
                    if(n.animateIn){
                        $('[data-id="' + n.id + '"]', currPage).hide();
                        animList.push(n);
                    }
                });

                animList.sort(function (a, b) {
                    return a.animateIn.delay - b.animateIn.delay;
                });

                setTimeout(function (argument) {
                    st = new Date().getTime();
                    timer.play();
                    $("#app-loading").hide();
                }, 500);
                
            }              
        });

        this.pages[0].addClass("z-current");
        this.initMusic();
        this.el.show();
    }

    return this;
}

/**
* 描述：通过全局参数liveApp 初始化页面 内置对象window上实现moveUp 和 moveDown 供外部调用
**/
function initView() {
	var h5 = new H5();
	for (var i = 0; i < liveApp.caseData.pages.length; i++) {
		var page = liveApp.caseData.pages[i];
		h5.addPage(page);
		for (var j = 0; j < page.components.length; j++) {
            h5.addComponent(page.components[j]);
		}
	}
	h5.loader();

	window.moveUp = function () {
		h5.moveUp();
	}

	window.moveDown = function () {
		h5.moveDown();
	}
}

$(function () {
    setTimeout(function () {
        if (liveApp.caseData.isPreview == false) {
            initView();
        }
    }, 200);
});