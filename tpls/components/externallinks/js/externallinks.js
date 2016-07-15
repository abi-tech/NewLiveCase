/**
* 描述：用于表示链接
* 函数列表：
* initialize($super, name, options) 1.构建表现结构 2.设置组件样式
* initFunType
* backgroundColorTable
* textTable
* iconTable
* setTextFun
* setIconFun
* setText
* setIcon
**/
var Externallinks = ExClass(H5ComponentBase, {
    initialize: function($super, name, options) { 
    	var that = this;

    	//默认参数结构
    	var defaultOptions = {
    		x: 217,
    		y: 822,
    		width: 0,
    		height: 0,
    		scale: 0,
    		icon: { url: null, width: 200, height: 126 },
    		text: { content: null, width: 200, height: 70 },
    		funType: "0",
    		funMode: "text",
    		containerCss: { },
    		componentCss: {
				"border-color": "none",
				"border-radius": "50rem",
				"transform": "rotate(0deg)",
				"opacity": 1,
				"border-width": "0px",
				"background-image": "none",
				"background-color": "none", 
			},
			innerCss: { },
			animateIn: null,
			animateOut: null,
			onDragEnd: function($html, x, y){ },
			onResizeEnd: function($html, x, y, w, h){ }
    	};
		that.options = $.extend({}, defaultOptions, options);

		that.initFunType();
		$super(name, that.options);

		setTimeout(function () {
			if(that.options.funMode == "text"){
				that.setIconFun();
			}else{
				that.setTextFun();
			}
			
		}, 5000);
    },
    //创建时 初始化参数 结构
    initFunType: function(){
    	this.initText();
    	this.initIcon();

    	switch(this.options.funMode){
    		case 'text': this.setTextFun(); break;
    		case 'icon': this.setIconFun(); break;
    	}
    },
    //默认背景色表
    initBackgroundColor: function () {
    	var color;
    	switch(this.options.funType){
    		case '0': color = 'rgba(0, 0, 0, 0.8)'; break;
    		case '1': color = 'rgba(22, 186, 48, 0.901961)'; break;
    		case '2': color = 'rgba(255, 157, 0, 0.901961)'; break;
    		case '3': color = 'rgba(74, 144, 226, 0.901961)'; break;
    	}
    	this.options.componentCss["background-color"] = color;
    },
    //默认背景色表
    initBorderColor: function () {
    	var color;
    	switch(this.options.funType){
    		case '0': color = 'rgb(68, 68, 68)'; break;
    		case '1': color = 'rgb(19, 167, 43)'; break; 
    		case '2': color = 'rgb(212, 141, 33)'; break;
    		case '3': color = 'rgb(75, 133, 203)'; break;
    	}
    	this.options.componentCss["border-color"] = color;
    },
    //初始化文字
    initText: function () {
    	if(typeof this.innerText === "string" && this.innerText.length > 0)
    		return;
    	var text = '';
	    switch(this.options.funType){
    		case '0': text = "点击打开"; break;
    		case '1': text = "拨打电话"; break;
    		case '2': text = "打开弹层"; break;
    		case '3': text = "点击跳转"; break;
    	}
    	this.options.text.content = text;
    },
    //初始化图标
    initIcon: function () {
    	if(typeof this.innerIcon === "string" && this.innerIcon.length > 0)
    		return ;
    	var icon = '';
	    switch(this.options.funType){
    		case '0': icon = "http://eng.liveapp.cn/tpl/components/links/externallinks/img/address.png"; break;
    		case '1': icon = "http://eng.liveapp.cn/tpl/components/links/externallinks/img/phone.png"; break;
    		case '2': icon = "http://eng.liveapp.cn/tpl/components/links/externallinks/img/layer.png"; break;
    		case '3': icon = "http://eng.liveapp.cn/tpl/components/links/externallinks/img/link.png"; break;
    	}
    	this.options.icon.url = icon;
    },
    //设置成text形式
    setTextFun: function(){
    	var that = this;
    	var innerCss = {
			"color": "rgb(255, 255, 255)",     //文字颜色
			"font-size": "1.875em",            //字体大小 
			"font-weight": "none",             //粗体
			"font-style": "none",            //斜体
			"text-decoration": "none",    //下划线
			"text-align": "center",            //居 左 left 中 center 右 right
		};

		that.options.width = that.options.text.width;
    	that.options.height = that.options.text.height;

    	that.options.innerCss = innerCss;

    	that.componentTemplate = [
			'<div class="c-externallinks content" inside-styles="">',
			    '<a class="f-fix link" href="javascript:;">',
			    	'<div class="btn-txt"><div class="btn-info"></div></div>',
			    '</a>',
			'</div>'
		].join('');

    	if(that.$component) delete that.$component;
		that.$component = $(that.componentTemplate);

		if(that.$container)
			that.$container.children().replaceWith(that.$component);

		if(that.$inner) delete that.$inner;
		that.$inner = that.$component.find(".link>div");

		that.initBackgroundColor();
    	that.initBorderColor();
		that.setComponentCss(that.options.componentCss);
		that.setInnerCss(that.options.innerCss);

		if(that.$html) that.$html.css("height", that.options.text.height * that.options.scale);
    	//设置文字
    	that.setText(that.options.text.content);
    },
    //设置成icon形式
    setIconFun: function(){
    	var that = this;
    	var innerCss = {
			"background-image": 'url("' +  that.options.icon.url + '")'
		};

		that.options.width = that.options.icon.width;
    	that.options.height = that.options.icon.height;

    	that.options.innerCss = innerCss;

    	that.componentTemplate = [
			'<div class="c-externallinks content" inside-styles="">',
			    '<a class="f-fix link" href="javascript:;">',
			    	'<div class="btn-icon"></div>',
			    '</a>',
			'</div>'
		].join('');

		if(that.$component) delete that.$component;
		that.$component = $(that.componentTemplate);

		if(that.$container)
			that.$container.children().replaceWith(that.$component);

		if(that.$inner) delete that.$inner;
		that.$inner = that.$component.find(".link>div");

    	//设置成icon的样式
    	that.initBackgroundColor();
    	that.initBorderColor();
    	this.options.componentCss["background-color"] = "rgba(225, 225, 225, 0)";
    	this.options.componentCss["border-color"] = "rgba(225, 225, 225, 0)";
    	that.setComponentCss(that.options.componentCss);
		that.setInnerCss(that.options.innerCss);

		if(that.$html) that.$html.css("height", that.options.icon.height * that.options.scale);
    	//设置图标
    	that.setIcon(that.options.icon.url);
    },
    //设置text形式的文字
    setText: function(text){
    	this.options.text.content = text;
    	this.$inner.find(".btn-info").text(text);
    },
    //设置icon形式的图标的url
    setIcon: function(url) {
    	this.options.icon.url = url;
    	this.options.innerCss["background-image"] = 'url("' + url + '")';
    	this.$inner.css("background-image", 'url("' + url + '")');
    }
});


