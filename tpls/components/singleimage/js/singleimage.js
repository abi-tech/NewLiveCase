var Singleimage = ExClass(H5ComponentBase, {
    initialize: function($super, options) {
    	var that = this;

    	that.defaultOptions = {
        	type: "singleimage",
        	x: 0,
        	y: 0,
        	width: 0,
        	height: 0,
        	url: "",
        	ratio: true,
        	componentCss: {
				"width": "100%",
	        	"height": "100%", 
	        	"overflow": "hidden",
	        	"background-color": "rgba(255, 255, 255, 0)",
	        	"border-width": "0px",                   
	        	"border-color": "rgba(225, 225, 225, 0)",
	        	"border-radius": "0px",                 
	        	"transform": "rotate(0deg)",           
	        	"opacity": 1,                         
			},
			innerCss: {
				'width': options.width + 'px', 
	        	'height': options.height + 'px',
	        	'margin-left': options.left + 'px', 
	        	'margin-top': options.top +  'px', 
	        	'transform': 'scale(' + options.scale + ')',
	        	'display': 'block'
			}
        }
		that.componentTemplate = [
			'<div class="c-singleimage preview-container" inside-styles="">',
				'<img class="jcrop-preview newImg" src="" />',
			'</div>'
		].join('');

		//子类控制自身组件的外观 内容
		//父类控制在design模式和view模式下与配置类互动
		that.$component = $(that.componentTemplate);
		that.$inner = that.$component.find("img");
		that.options = $.extend({}, that.defaultOptions, options);

		$super(that.options);

		that.setScale(that.options.scale);
		that.setUrl(that.options.url);
    },
    setUrl: function (url) {
    	var that = this;
    	that.options.url = url;
    	that.$inner.prop("src", that.options.url);
    },
    setScale: function(scale) {
    	this.$inner.css("transform", 'scale(' + scale + ')');
    }
});