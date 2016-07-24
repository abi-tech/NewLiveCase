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

    /**
    * 描述：添加页面
    * 参数：options H5Page的页面参数
    **/
    this.addPage = function(options){
        var page = $('<div class="page section">');
        var bgImage = $('<img style="position: absolute; width: auto; height: 100%; left: 0px; top: 0px;">');
        var slideIcon = $('<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop u-guideTop-' + options.slideIcon.value + '"></a></div>');
        
        page.css("background-color", options.bgColor);
        bgImage.attr("src", options.bgImage.url);
        page.append(bgImage);
        page.append(slideIcon);
        this.el.append(page);
        this.pages.push(page);
        this.pageCfg.push(options);
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

    /**
    * 描述：播放动画
    **/
    this.animate = function (animation, animateBegin, animateEnd) {
    	var that = this;
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    	animateBegin && animateBegin();

    	that.el.css("animation", "a_slide_topIn 0.7s ease").one(animationEnd, function() {
    		that.el.css("animation", "none");
    		that.el.find('.h5_component').trigger('onLoad');

    		animateEnd && animateEnd();
    	});
    }

    /**
    * 描述：注册fullpage.js 插件功能
    * 主要实现翻页动画 及 状态标记修改过
    **/
    this.loader = function(){
        this.el.fullpage({
            onLeave: function(index, nextIndex, direction){ console.log("onLeave", index, nextIndex, direction);
            	that.pages[index - 1].removeClass("z-current");
            	that.pages[index - 1].addClass("z-move");
            	that.pages[nextIndex - 1].addClass("z-current");
            	that.pages[nextIndex - 1].addClass("z-move");
            	that.pages[nextIndex - 1].find('.h5_component').hide();

                //$(this).find('.h5_component').trigger('onLeave');
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                var animation = that.pageCfg[nextIndex - 1].animation;

                if(!animation) return;
                var express = animation.effect + " " + animation.duration + "s backwards";
                that.pages[nextIndex - 1].css("animation", express).one(animationEnd, function() {
                	that.pages[nextIndex - 1].css("animation", "none");
                });
            },
            afterLoad: function(anchorLink, index){ console.log("afterLoad", anchorLink, index);
             	that.pages[index - 1].find('.h5_component').trigger('onLoad');
             	that.pages[index - 1].find('.h5_component').show();
             	$(this).siblings().removeClass("z-move");
             	$(this).removeClass("z-move");
            }               
        });

        this.pages[0].addClass("z-current");
        this.el.show();
    }
    return this;
}

mainModule.controller('mainController', [ '$http', '$scope', function ($http, $scope) {  
	//!liveApp.isPreview && initView();
}]); 

/**
* 描述：通过全局参数liveApp 初始化页面 内置对象window上实现moveUp 和 moveDown 供外部调用
**/
function initView() {
	var h5 = new H5();
	for (var i = 0; i < liveApp.caseData.pages.length; i++) {
		var page = liveApp.caseData.pages[i];
		h5.addPage(page);
		for (var j = 0; j < page.components.length; j++) {
			var component = page.components[j];
			h5.addComponent(component.options);
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