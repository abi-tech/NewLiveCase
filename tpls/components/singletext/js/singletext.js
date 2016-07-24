var Singletext = ExClass(H5ComponentBase, {
    initialize: function($super, options) { 
    	var that = this;
        
        that.defaultOptions = {
        	type: "singletext",
        	x: 111.5,
        	y: 108,
        	width: 417,
        	height: 80,
        	text: "右侧输入文本",
        	containerCss: {
        		"line-height": 1
        	},
        	componentCss: {
				"border-width": "0px", 
				"border-color": "rgba(204, 204, 204, 0)", 
				"border-radius": "0px", 
				"transform": "rotate(0deg)", 
				"opacity": 1, 
				"background-image": "none", 
				"background-color": "rgba(225, 225, 225, 0)"
			},
			innerCss: {
				"line-height": 1.5,
				"text-align": "center",
				"font-size": "2.5em",
				"font-family": "SimHei",
				"color": "rgb(51, 51, 51)"
			}
        }

		that.componentTemplate = '<div inside-styles="" class="text-wrap" ng-style="component.componentCss"></div>';
		that.innerTemplate = '<div class="text-content" ng-style="component.innerCss" ng-bind="component.text"></div>';
		that.confTemplate = '';

		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		that.options = $.extend(true, {}, that.defaultOptions, options);

		$super(that.options);
		$.extend(that, that.options);
		that.$container.addClass("c-single-text");

		if(typeof that.options.text === 'string' && that.options.text.length > 0){
        	that.$inner.text(that.options.text);
        	that.$viewInner.text(that.options.text);
		}
        else{
        	that.$inner.text('右侧输入文本');
        	that.$viewInner.text('右侧输入文本');
        }
    }
});