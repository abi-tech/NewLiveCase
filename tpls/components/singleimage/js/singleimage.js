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
	        	'margin-left': '0px', 
	        	'margin-top': '0px', 
	        	'transform': 'scale(' + options.scale + ')',
	        	'display': 'block'
			}
        }
		that.componentTemplate = '<div class="c-singleimage preview-container" inside-styles=""></div>';
		that.innerTemplate = '<img class="jcrop-preview newImg" src="" />';
		that.configTemplate = '<div image-cropper></div><div config-position></div>';

		//子类控制自身组件的外观 内容
		//父类控制在design模式和view模式下与配置类互动
		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		that.$config = $(that.configTemplate);
		that.options = $.extend({}, that.defaultOptions, options);

		$super(that.options);

		that.setScale(that.options.scale);
		that.setUrl(that.options.url);
    },
    setUrl: function (url) {
    	var that = this;
    	that.options.url = url;
    	that.$viewInner.prop("src", that.options.url); console.log(that.$viewInner);
    	that.$inner.prop("src", that.options.url);
    },
    setScale: function(scale) {
    	this.$inner.css("transform", 'scale(' + scale + ')');
    }
});

mainModule.directive("imageCropper", function () {
    return {
        restrict: "A",
        template: [
		    '<section class="c-conf-section z-expand" style="display: block;">',
		        '<section class="c-conf-panel">',
		            '<div class="jcrop-panel-header" style="overflow: hidden">更换图片</div>',
		            '<div class="jcrop-panel">',
		                '<div class="jcrop-wrap">',
		                    '<img id="image" />',
		                '</div>',
		            '</div>',
		            '<div class="jcrop-setUp">',
		                '<ul>',
		                    '<li data-value="0" class="curr"> 自由</li>',
		                    '<li data-value="1"> 正方形</li>',
		                    '<li data-value="2"> 4:3</li>',
		                    '<li data-value="3"> 16:9</li>',
		                    '<li data-value="4"> 铺满</li>',
		                '</ul>',
		            '</div>',
		        '</section>',
		    '</section>'
		].join(''),
        replace: true,
        link: function (scope, element, attrs) {
            var $image = $('.jcrop-wrap>img', element);

            // ngModelController.$render = function () {
            //     var viewValue = ngModelController.$viewValue;
            // }
            $image.attr("src", scope.currentComponent.options.url);

            function initCropperBox() {
                var ratio = 0.2;
                $image.cropper('setCropBoxData', {
                    top: 10,
                    left: 0,
                    width: 10,
                    height: 10
                });
            }

            var options = {
                viewMode: 2,
                //dragMode: 'none',
                //preview: '.preview-container',
                aspectRatio: 'NaN',
                modal: false,
                checkCrossOrigin: false,
                //preview: '.img-preview',
                //background: false,
                autoCrop: false,
                autoCropArea: 1,
                //scalable: true,
                zoomOnWheel: false,
                built: function () {
                    initCropperBox();
                    $image.cropper('crop');
                    //$image.cropper('clear');
                }
            }

            $image.cropper(options);
            
            $(".jcrop-setUp ul>li", element).on("click", function(){
                $(".jcrop-setUp ul>li", element).removeClass("curr");
                $(this).addClass("curr");
                var data = $(this).data("value"); 
                switch(data){
                    case 0: options.aspectRatio = 'NaN'; break;
                    case 1: options.aspectRatio = 1; break;
                    case 2: options.aspectRatio = 1.3333333333333333; break;
                    case 3: options.aspectRatio = 1.7777777777777777; break;
                    case 4: break;
                } 
                console.log(data, options);
                if (data == 4) return;

                $image.cropper('setAspectRatio', options.aspectRatio);
                
            });

            $image.on('cropend.cropper', function (e) {
                console.log(e); // cropstart
                console.log(e.namespace); // cropper
                console.log(e.action); // ...
                console.log(e.originalEvent.pageX);

                // Prevent to start cropping, moving, etc if necessary
                if (e.action === 'crop') {
                    e.preventDefault();
                }
            });
            $image.on('crop.cropper', function (e) {
                console.log(e);

                // scope.currentComponent.containerCss["width"] = e.width;
                // scope.currentComponent.containerCss["height"] = e.height;
                // scope.currentComponent.innerCss["margin-top"] = -e.y;
                // scope.currentComponent.innerCss["margin-left"] = -e.x;

                scope.currentComponent.$viewInner.css("margin-top", -e.y);
                scope.currentComponent.$viewInner.css("margin-left", -e.x);

                scope.currentComponent.$inner.css("margin-top", -e.y * scope.currentComponent.options.scale);
                scope.currentComponent.$inner.css("margin-left", -e.x * scope.currentComponent.options.scale);

                scope.currentComponent.$view.css("width", e.width);
                scope.currentComponent.$view.css("height", e.height);

                scope.currentComponent.$html.css("width", e.width * scope.currentComponent.options.scale);
                scope.currentComponent.$html.css("height", e.height * scope.currentComponent.options.scale);
                scope.$apply();
            });
        }
    }
});