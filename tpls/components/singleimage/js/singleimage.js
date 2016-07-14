var Singleimage = ExClass(H5ComponentBase, {
    initialize: function($super, name, options) {
    	var that = this;

		that.componentTemplate = [
			'<div class="c-singleimage preview-container" inside-styles="">',
				'<img class="jcrop-preview newImg" src="" />',
			'</div>'
		].join('');

		options.componentCss = {
			"width": "100%",
        	"height": "100%", 
        	"overflow": "hidden",
        	"background-color": "rgba(255, 255, 255, 0)", //背景色
        	"border-width": "0px",                   //边框宽度
        	"border-color": "rgba(225, 225, 225, 0)",    //边框颜色
        	"border-radius": "0px",                  //边框圆角
        	"transform": "rotate(0deg)",            //暂时无用
        	"opacity": 1,                         //透明度
		};

		options.innerCss = {
			'width': options.width + 'px', 
        	'height': options.height + 'px',
        	'margin-left': options.left + 'px', 
        	'margin-top': options.top +  'px', 
        	'transform': 'scale(' + options.scale + ')',
        	'display': 'block'
		};

		//子类控制自身组件的外观 内容
		//父类控制在design模式和view模式下与配置类互动
		that.$component = $(that.componentTemplate);
		that.$inner = that.$component.find("img").prop("src", options.imgUrl);

		//等比缩放
		options.ratio = true;
		$super(name, options);
    }
});