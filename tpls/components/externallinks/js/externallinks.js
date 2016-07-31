/**
* 描述：用于表示按钮组件
**/
var Externallinks = ExClass(H5ComponentBase, {
    initialize: function($super, options) { 
    	var that = this;

    	//默认参数结构
    	that.defaultOptions = {
            type: "externallinks",
    		left: 217,
    		top: 822,
    		width: 0,
    		height: 0,
    		funType: null,
            funMode: null,
            address: null,
            phone: null,
            layer: "/static/images/layer-default.png",
            link: null,
            pageSize: 1,
            text: null,
            icon: null,
            fontSize: 26,
            fontColor: "rgb(255, 255, 255)",
            textAlign: "center",
            fontWeight: "",
            fontStyle: "",
            textDecoration: "",
            borderRadius: 50,
    		componentCss: {
                "width": "100%",
                "height": "100%",
				//"background-image": "none",
			},
			innerCss: {},
			animateIn: null,
			animateOut: null,
			onDragEnd: function($html, x, y){ },
			onResizeEnd: function($html, x, y, w, h){ }
    	};
		that.options = $.extend({}, that.defaultOptions, options);

        that.initText();
        that.initIcon();
		that.initFunType();
		$super(that.options);

        that._setCss(that.$viewComponent, that.options.componentCss);
        that._setCss(that.$viewInner, that.options.innerCss);

        that.setIcon(that.options.icon);
        that.setText(that.options.text);
		// setTimeout(function () {
		// 	if(that.options.funMode == "text"){
		// 		that.setIconFun();
		// 	}else{
		// 		that.setTextFun();
		// 	}
			
		// }, 5000);
    },
    buildConfig: function () {
        var that = this;

        that.$conf && that.$conf.remove();
        that.$config && that.$config.remove();
        delete that.$conf;
        delete that.$config;
        that.initConfHead();
        that.configTemplate = [
        '<section class="c-config-wapper">',
            '<header class="c-conf-header">',
                '<div class="c-compnent-icon" style="background-image: url(\'/static/images/externallinks.png\');"></div>',
                '<span style="color:#444">' + that.options.head + '</span>',
            '</header>',
            '<div conf-externallinks></div>',
            '<div config-common></div>',
        '</section>'
        ].join('');
        that.$config = $(that.configTemplate);
    },
    //创建时 初始化参数 结构
    initFunType: function(){
        this.initSize();

    	switch(this.options.funMode){
    		case 'text': this.setTextFun(); break;
    		case 'icon': this.setIconFun(); break;
    	}
    },
    initSize: function () {
        switch(this.options.funMode){
            case 'text': 
                this.options.width = 200;
                this.options.height = 70;
                break;
            case 'icon': 
                this.options.width = 200;
                this.options.height = 126;
                break;
        }
    },
    initConfHead: function (argument) {
        var head = "按钮-";
        switch(this.options.funType){
            case '0': head += '链接'; break;
            case '1': head += '拨打电话'; break;
            case '2': head += '弹出层'; break;
            case '3': head += '跳转页面'; break;
        }
        this.options.head = head;
    },
    //默认背景色表
    initBackgroundColor: function () {
    	var color = "rgba(225, 225, 225, 0)";
        this.options.backgroundColor = color;
        if(this.options.funMode === 'icon') return;
    	switch(this.options.funType){
    		case '0': color = 'rgba(0, 0, 0, 0.8)'; break;
    		case '1': color = 'rgba(22, 186, 48, 0.901961)'; break;
    		case '2': color = 'rgba(255, 157, 0, 0.901961)'; break;
    		case '3': color = 'rgba(74, 144, 226, 0.901961)'; break;
    	}
    	this.options.backgroundColor = color;
    },
    //默认背景色表
    initBorderColor: function () {
    	var color = "rgba(225, 225, 225, 0)";
        this.options.borderColor = color;
        if(this.options.funMode === 'icon') return;
    	switch(this.options.funType){
    		case '0': color = 'rgb(68, 68, 68)'; break;
    		case '1': color = 'rgb(19, 167, 43)'; break; 
    		case '2': color = 'rgb(212, 141, 33)'; break;
    		case '3': color = 'rgb(75, 133, 203)'; break;
    	}
    	this.options.borderColor = color;
    },
    //初始化文字
    initText: function () {
    	if(typeof this.text === "string" && this.text.length > 0)
    		return;
    	var text = '';
	    switch(this.options.funType){
    		case '0': text = "点击打开"; break;
    		case '1': text = "拨打电话"; break;
    		case '2': text = "打开弹层"; break;
    		case '3': text = "点击跳转"; break;
    	}
    	this.options.text = text;
    },
    //初始化图标
    initIcon: function () {
    	if(typeof this.icon === "string" && this.icon.length > 0)
    		return ;
    	var icon = '';
	    switch(this.options.funType){
    		case '0': icon = "/tpls/components/externallinks/images/address.png?v=1"; break;
    		case '1': icon = "/tpls/components/externallinks/images/phone.png?v=1"; break;
    		case '2': icon = "/tpls/components/externallinks/images/layer.png?v=1"; break;
    		case '3': icon = "/tpls/components/externallinks/images/link.png?v=1"; break;
    	}
    	this.options.icon = icon;
    },
    //设置成text形式
    setTextFun: function(){
    	var that = this;
        //delete that.options.innerCss;
    	var innerCss = {
			"color": "rgb(255, 255, 255)",     //文字颜色
			"font-size": "1.625em",            //字体大小 
			"font-weight": "none",             //粗体
			"font-style": "none",            //斜体
			"text-decoration": "none",    //下划线
			"text-align": "center",            //居 左 left 中 center 右 right
		};
    	that.options.innerCss = innerCss;

    	that.componentTemplate = '<div class="c-externallinks content" inside-styles=""></div>';
        that.innerTemplate = '<a class="f-fix link" href="javascript:;"><div class="btn-txt"><div class="btn-info"></div></div></a>';

		that.initBackgroundColor();
    	that.initBorderColor();

        if (that.$view) {
            that.$viewComponent = $(that.componentTemplate);
            that.$viewInner = $(that.innerTemplate);
            that.$viewComponent.append(that.$viewInner);

            that.$component = $(that.componentTemplate);
            that.$inner = $(that.innerTemplate);
            that.$component.append(that.$inner);

            that.$view.find(".c-externallinks").replaceWith(that.$viewComponent);
            that.$html.find(".c-externallinks").replaceWith(that.$component);
            // that.options.backgroundColor = "rgb(225, 225, 225, 0)";
            // that.options.borderColor = "rgb(225, 225, 225, 0)";

            that.setInnerCss();
            that.setComponentCss();
            that.setXYWH();
            that.setIcon(that.options.icon);
            that.setText(that.options.text);
        }
    },
    //设置成icon形式
    setIconFun: function(){
    	var that = this;
        that.options.componentCss = {
            "width": "100%",
            "height": "100%",
        };

    	var innerCss = {
			"background-image": 'none;'
		};
    	that.options.innerCss = innerCss;

    	that.componentTemplate = '<div class="c-externallinks content" inside-styles=""></div>';
        that.innerTemplate = '<a class="f-fix link" href="javascript:;"><div class="btn-icon"></div></a>';
        //设置成icon的样式
        that.initBackgroundColor();
        that.initBorderColor();

        if (that.$view) {   
            that.$viewComponent = $(that.componentTemplate);
            that.$viewInner = $(that.innerTemplate);
            that.$viewComponent.append(that.$viewInner);

            that.$component = $(that.componentTemplate);
            that.$inner = $(that.innerTemplate);
            that.$component.append(that.$inner);

            that.$view.find(".c-externallinks").replaceWith(that.$viewComponent);
            that.$html.find(".c-externallinks").replaceWith(that.$component);
            // that.options.backgroundColor = "rgba(225, 225, 225, 0)";
            // that.options.borderColor = "rgba(225, 225, 225, 0)";

            that.setInnerCss();
            that.setComponentCss();
            that.setXYWH();
            that.setIcon(that.options.icon);
            that.setText(that.options.text);
        }
    },
    setInnerCss: function () {
        this.options.innerCss["font-size"] = (parseInt(this.options.fontSize) / 16) + "em";
        this.options.innerCss["color"] = this.options.fontColor;
        this.options.innerCss["text-align"] = this.options.textAlign;
        this.options.innerCss["font-weight"] = this.options.fontWeight;
        this.options.innerCss["font-style"] = this.options.fontStyle;
        this.options.innerCss["text-decoration"] = this.options.textDecoration;

        this._setCss(this.$viewInner, this.options.innerCss);
        this._setCss(this.$inner, this.options.innerCss);
    },
    switchFunMode: function (mode) {
        this.initialize($super, this.options);
    },
    //设置text形式的文字
    setText: function(text){
    	this.options.text = text;
        this.$view.find(".btn-info").text(text);
    	this.$html.find(".btn-info").text(text);
    },
    //设置icon形式的图标的url
    setIcon: function(url) {
    	this.options.icon = url;
    	this.options.innerCss["background-image"] = 'url("' + url + '")';
        this.$view.find(".btn-icon").css("background-image", "url('" + url + "')");
    	this.$html.find(".btn-icon").css("background-image", "url('" + url + "')");
    }
});


