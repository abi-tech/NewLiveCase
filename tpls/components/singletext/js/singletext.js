var Singletext = ExClass(H5ComponentBase, {
    initialize: function($super, name, options) { 
    	var that = this;
        
        options.width = 417;
        options.height = 80;
        options.x = (640 - 417) / 2;
        options.y = 108;

		that.componentTemplate = [
			'<div inside-styles="" class="text-wrap">',
			    '<div class="text-content">右侧输入文本</div>',
			'</div>'
		].join('');

		options.componentCss = {
			"border-width": "0px", 
			"border-color": "rgba(204, 204, 204, 0)", 
			"border-radius": "0px", 
			"transform": "rotate(0deg)", 
			"opacity": 1, 
			"background-image": "none", 
			"background-color": "rgba(225, 225, 225, 0)"
		};

		options.innerCss = {
			"line-height": 1.5,
			"text-align": "center",
			"font-size": "2.5em",
			"font-family": "SimHei",
			"color": "rgb(51, 51, 51)"
		};

		that.$component = $(that.componentTemplate);
		that.$inner = that.$component.find(".text-content");

		$super(name, options);

		if(typeof that.innerText === 'string' && that.innerText.length > 0)
        	that.$inner.text(that.innerText);
        else
        	that.$inner.text('右侧输入文本');
    }
});