/**
* 描述：用于表示文本组件
**/
var Singletext = ExClass(H5ComponentBase, {
    initialize: function($super, options) { 
    	var that = this;
        
        that.defaultOptions = {
        	type: "singletext",
        	left: 112,
        	top: 108,
        	width: 417,
        	height: 80,
        	text: "右侧输入文本",
        	fontSize: 40,
			fontColor: "rgb(51, 51, 51)",
			textAlign: "center",
			lineHeight: 1.5,
			fontFamily: "SimHei",
			fontWeight: "",
			fontStyle: "",
			textDecoration: "",
        	containerCss: { },
        	componentCss: {
				"border-width": "0px", 
				"border-color": "rgba(204, 204, 204, 0)", 
				"border-radius": "0px", 
				"transform": "rotate(0deg)", 
				"opacity": 1, 
				"background-image": "none", 
				"background-color": "rgba(225, 225, 225, 0)"
			},
			innerCss: { }
        }

		that.componentTemplate = '<div inside-styles="" class="text-wrap"></div>';
		that.innerTemplate = '<div class="text-content"></div>';
		that.configTemplate = '<div config-position></div>';

		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		//that.$config = $(that.configTemplate);
		that.options = $.extend(true, {}, that.defaultOptions, options);

		$super(that.options);
		//$.extend(that, that.options);
		that.$container.addClass("c-single-text");
		
		that.refresh();

		that.buildConfig();
		if(typeof that.options.text === 'string' && that.options.text.length > 0){
        	that.$inner.text(that.options.text);
        	that.$viewInner.text(that.options.text);
		}
        else{
        	that.$inner.text('右侧输入文本');
        	that.$viewInner.text('右侧输入文本');
        }
    },
    buildConfig : function () {
    	var that = this;

    	var confTemplate = [
    	'<section class="c-config-wapper">',
			'<header class="c-conf-header">',
	            '<div class="c-compnent-icon" style="background-image: url(\'/static/images/singletext.png\');"></div>',
	            '<span style="color:#444">文本</span>',
	        '</header>',
			'<div conf-singletext></div>',
			'<div config-common></div>',
		'</section>'
    	].join('');

    	that.$config = $(confTemplate);
    },
    refresh: function () {
        this.options.innerCss["font-size"] = (parseInt(this.options.fontSize) / 16) + "em";
        this.options.innerCss["color"] = this.options.fontColor;
        this.options.innerCss["text-align"] = this.options.textAlign;
        this.options.innerCss["line-height"] = this.options.lineHeight;
        this.options.innerCss["font-family"] = this.options.fontFamily;
        this.options.innerCss["font-weight"] = this.options.fontWeight;
        this.options.innerCss["font-style"] = this.options.fontStyle;
        this.options.innerCss["text-decoration"] = this.options.textDecoration;
        //console.log(this.options.innerCss);
        this._setCss(this.$viewInner, this.options.innerCss);
        this._setCss(this.$inner, this.options.innerCss);

        this.$inner.text(this.options.text);
        this.$viewInner.text(this.options.text);
    },
});

