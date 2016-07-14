var Externallinks = ExClass(H5ComponentBase, {
    initialize: function($super, name, options) { 
    	var that = this;
		that.options = options;

		that.applyFunType(options.funType);
		$super(name, options);

		setTimeout(function () {
			that.applyFunType(1);
		}, 5000);
    },
    applyFunType: function(funType){
    	var that = this;
    	that.options.funType = funType;
    	that.funType = funType;

    	that.options.componentCss = {
			"border-color": (funType == '1'?  "rgba(225, 225, 225, 0)" : "rgb(68, 68, 68)"),
			"border-radius": "50rem",
			"transform": "rotate(0deg)",
			"opacity": 1,
			"border-width": "0px",
			"background-image": "none",
			"background-color": that.echoBackgroundColor(funType), 
		};

    	var tpl_icon = '<div class="btn-icon"></div>';
		var tpl_text = '<div class="btn-txt"><div class="btn-info"></div></div>';
		var iconInnerCss = {
			"background-image": 'url("' +  that.options.innerIcon + '")'
		};
		var textInnerCss = {
			"color": "rgb(255, 255, 255)",     //文字颜色
			"font-size": "1.875em",            //字体大小 
			"font-weight": "none",             //粗体
			"font-style": "none",            //斜体
			"text-decoration": "none",    //下划线
			"text-align": "center",            //居 左 left 中 center 右 right
		};

		// if(that.componentTemplate) delete that.componentTemplate;
		// if(that.$component) delete that.$component;
		// if(that.$inner) delete that.$inner;

		//funType 功能类型 判断 显示内容 
		//0 链接 1拨打电话 2弹层层 3跳转页面
		that.componentTemplate = [
			'<div class="c-externallinks content" inside-styles="">',
			    '<a class="f-fix link" href="javascript:;">',
			        (funType == '1'? tpl_icon : tpl_text),
			    '</a>',
			'</div>'
		].join('');

		if(that.$component) delete that.$component;
		that.$component = $(that.componentTemplate);

		if(that.$container)
			that.$container.children().replaceWith(that.$component);

		//更新 $inner
		if(that.$inner) delete that.$inner;
		that.$inner = that.$component.find(".link>div");

		that.options.innerCss = funType == '1'? iconInnerCss : textInnerCss;
		that.setComponentCss(that.componentCss);
		that.setInnerCss(that.innerCss);
		that.setInner(funType == "1" ?  that.options.innerIcon : that.options.innerText);
    },
    setInner: function(inner){
    	var that = this;
    	if(that.options.funType != '1'){
			if(typeof inner === 'string' && inner.length > 0){
	        	that.$inner.text(inner);
			}
	        else{
	        	switch(that.options.funType){
	        		case '0': that.$inner.text("点击打开"); break;
	        		case '2': that.$inner.text("打开弹层"); break;
	        		case '3': that.$inner.text("点击跳转"); break;
	        	}
			}
	    }else{
	    	that.$inner.css("background-image", 'url("' + inner + '")');
	    }
    },
    echoBackgroundColor: function (funType) {
    	var bgColor;
    	switch(funType){
    		case '0': bgColor = 'rgba(0, 0, 0, 0.8)'; break;
    		case '1': bgColor = 'rgba(225, 225, 225, 0)'; break;
    		case '2': bgColor = 'rgba(255, 157, 0, 0.901961)'; break;
    		case '3': bgColor = 'rgba(74, 144, 226, 0.901961)'; break;
    	}
    	return bgColor;
    }
});


