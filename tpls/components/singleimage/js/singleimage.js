/**
* 描述：用于表示图片组件
**/
var Singleimage = ExClass(H5ComponentBase, {
    initialize: function($super, options) {
    	var that = this;

    	that.defaultOptions = {
        	type: "singleimage",
            url: null,
        	left: 0,
        	top: 0,
            width: 0,
            height: 0,
            marginTop: 0,
            marginLeft: 0,
            ratio: true,
            aspectRatio: "NaN",
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
		that.componentTemplate = '<div class="c-singleimage preview-container" inside-styles="" ng-style="component.componentCss"></div>';
		that.innerTemplate = '<img class="jcrop-preview newImg" ng-style="component.innerCss" ng-src="{{ component.url }}"/>';
		that.configTemplate = [
        '<section class="c-config-wapper">',
            '<header class="c-conf-header">',
                '<div class="c-compnent-icon" style="background-image: url(\'/static/images/singleimage.png\');"></div>',
                '<span style="color:#444">图片</span>',
            '</header>',
            '<div conf-singleimage></div>',
            '<div config-common></div>',
        '</section>'
        ].join('');

		//子类控制自身组件的外观 内容
		//父类控制在design模式和view模式下与配置类互动
		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		that.$config = $(that.configTemplate);
		that.options = $.extend({}, that.defaultOptions, options);
        //console.log(that.options);
		$super(that.options);

		that.setScale(that.options.scale);
		that.setUrl(that.options.url);
    },
    setWidth: function (width) {
        var that = this;
        that.options.width = width;
        that.$viewInner.css("width", that.options.width);
        that.$inner.css("width", that.options.width);
    },
    setHeight: function (height) {
        var that = this;
        that.options.height = height;
        that.$viewInner.css("height", that.options.height);
        that.$inner.css("height", that.options.height);
    },
    setUrl: function (url) {
        var that = this;
    	that.options.url = url;
    	that.$viewInner.attr("src", that.options.url);
    	that.$inner.attr("src", that.options.url);
    },
    setScale: function(scale) {
    	this.$inner.css("transform", 'scale(' + scale + ')');
    },
    buildConfig: function () {
        var that = this;

        that.$conf && that.$conf.remove();
        that.$config && that.$config.remove();
        delete that.$conf;
        delete that.$config;

        this.$config = $(this.configTemplate);
    },
    refresh: function () {
        this.options.containerCss["width"] = this.options.width;
        this.options.containerCss["height"] = this.options.height;
        // this.options.innerCss["width"] = this.options.width;
        // this.options.innerCss["height"] = this.options.height;
        this.options.innerCss["margin-left"] = this.options.marginLeft;
        this.options.innerCss["margin-top"] = this.options.marginTop;

        this.$html.css("width", this.options.width * this.options.scale);
        this.$html.css("height", this.options.height * this.options.scale);
        this.$inner.css("margin-left", this.options.marginLeft * this.options.scale);
        this.$inner.css("margin-top", this.options.marginTop * this.options.scale);

        this._setCss(this.$view, this.options.containerCss);
        this._setCss(this.$viewInner, this.options.innerCss);

        this.$viewInner.prop("src", this.options.url);
        this.$inner.prop("src", this.options.url);
    }
});



// mainModule.directive("confSingleimage", function () {
//     return {
//         restrict: "A",
//         template: [
// 		    '<section class="c-conf-section z-expand" style="display: block;">',
// 		        '<section class="c-conf-panel">',
// 		            '<div class="jcrop-panel-header">更换图片</div>',
// 		            '<div class="jcrop-panel">',
// 		                '<div class="jcrop-wrap">',
// 		                    '<img id="image" />',
// 		                '</div>',
// 		            '</div>',
// 		            '<div class="jcrop-setUp">',
// 		                '<ul>',
// 		                    '<li data-value="0" class="curr"> 自由</li>',
// 		                    '<li data-value="1"> 正方形</li>',
// 		                    '<li data-value="2"> 4:3</li>',
// 		                    '<li data-value="3"> 16:9</li>',
// 		                    '<li data-value="4"> 铺满</li>',
// 		                '</ul>',
// 		            '</div>',
// 		        '</section>',
// 		    '</section>'
// 		].join(''),
//         replace: true,
//         link: function (scope, element, attrs) {
//             var copper;
//             var $image = $('.jcrop-wrap>img', element);
//             var $btn = $('.jcrop-panel-header', element);
//             $image.attr("src", scope.currentComponent.options.url);

//             $btn.on("click", function (e) {
//                 var fileDialog = new FileDialog({
//                     type: "image", // image music
//                     onChosenEnd: function (item) {
//                         console.log(item.options);
//                         scope.currentComponent.setWidth(item.options.width);
//                         scope.currentComponent.setHeight(item.options.height);
//                         scope.currentComponent.setUrl(item.options.url);
//                         $image.cropper("replace", item.options.url);
//                     }
//                 });
//                 fileDialog.show();
//             });
//             function initCropperBox() {
//                 var ratio = 0.2;
//                 $image.cropper('setCropBoxData', {
//                     top: 10,
//                     left: 0,
//                     width: 10,
//                     height: 10
//                 });
//             }

//             var options = {
//                 viewMode: 2,
//                 aspectRatio: 'NaN',
//                 modal: false,
//                 checkCrossOrigin: false,
//                 autoCrop: false,
//                 autoCropArea: 1,
//                 zoomOnWheel: false,
//                 built: function () {
//                     initCropperBox();
//                     $image.cropper('crop');
//                 }
//             }

//             $image.cropper(options);
            
//             $(".jcrop-setUp ul>li", element).on("click", function(){
//                 $(".jcrop-setUp ul>li", element).removeClass("curr");
//                 $(this).addClass("curr");
//                 var data = $(this).data("value"); 
//                 switch(data){
//                     case 0: options.aspectRatio = 'NaN'; break;
//                     case 1: options.aspectRatio = 1; break;
//                     case 2: options.aspectRatio = 1.3333333333333333; break;
//                     case 3: options.aspectRatio = 1.7777777777777777; break;
//                     case 4: break;
//                 } 
//                 if (data == 4) return;

//                 $image.cropper('setAspectRatio', options.aspectRatio);
//             });

//             $image.on('cropend.cropper', function (e) {
//                 if (e.action === 'crop') {
//                     e.preventDefault();
//                 }
//             });
//             $image.on('crop.cropper', function (e) {
//                 scope.currentComponent.width = e.width;
//                 scope.currentComponent.height = e.height;

//                 scope.currentComponent.options.containerCss["width"] = e.width;
//                 scope.currentComponent.options.containerCss["height"] = e.height;
//                 scope.currentComponent.options.innerCss["margin-top"] = -e.y;
//                 scope.currentComponent.options.innerCss["margin-left"] = -e.x;

//                 scope.currentComponent.$viewInner.css("margin-top", -e.y);
//                 scope.currentComponent.$viewInner.css("margin-left", -e.x);

//                 scope.currentComponent.$inner.css("margin-top", -e.y * scope.currentComponent.options.scale);
//                 scope.currentComponent.$inner.css("margin-left", -e.x * scope.currentComponent.options.scale);

//                 scope.currentComponent.$view.css("width", e.width);
//                 scope.currentComponent.$view.css("height", e.height);

//                 scope.currentComponent.$html.css("width", e.width * scope.currentComponent.options.scale);
//                 scope.currentComponent.$html.css("height", e.height * scope.currentComponent.options.scale);
//                 scope.$apply();
//             });
//         }
//     }
// });