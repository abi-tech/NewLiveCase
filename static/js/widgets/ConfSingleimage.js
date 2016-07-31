var ConfSingleimage = function (options) {
	var that = this;
	var defaultOptions = {
		data: {
			url: null,
			width: 0,
			height: 0,
			marginTop: 0,
			marginLeft: 0,
			aspectRatio: "NaN",
		},
		onChange: function (data) { }
	};

	that.options = $.extend({}, defaultOptions, options);

	var tpl = [
    '<section class="c-conf-section z-expand" style="display: block;">',
        '<section class="c-conf-panel">',
            '<div class="jcrop-panel-header">更换图片</div>',
            '<div class="jcrop-panel">',
                '<div class="jcrop-wrap">',
                    '<img />',
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
	].join('');

	that.setUrl = function (url) {
		that.$image.cropper("replace", url);
	}

	that.initCopper = function (argument) {
        that.$image.cropper({
            viewMode: 2,
            aspectRatio: that.options.aspectRatio,
            modal: false,
            checkCrossOrigin: false,
            autoCrop: false,
            autoCropArea: 1,
            zoomOnWheel: false,
            built: function () { 
                that.$image.cropper('setCropBoxData', {
	                top: 10,
	                left: 0,
	                width: that.options.data["width"],
	                height: that.options.data["height"]
	            });
                that.$image.cropper('crop');
            }
        });
	}

	that.initView = function () {
		that.$html = $(tpl);
		that.$image = $('.jcrop-wrap>img', that.$html);
        that.$btn = $('.jcrop-panel-header', that.$html);
        that.$image.attr("src", that.options.data["url"]);
        that.initCopper();
        that.$image.cropper("setCropBoxData", {
            width: that.options.width, 
            height: that.options.height 
        });
	}

	that.initEvent = function () {
		that.$btn.on("click", function (e) {
            var fileDialog = new FileDialog({
                type: "image", // image music
                onChosenEnd: function (item) {
                	that.options.data["url"] = item.options.url;
                	that.options.data["width"] = item.options.width;
            		that.options.data["height"] = item.options.height;
                    that.setUrl(item.options.url);
                    that.options.onChange(that.options.data);
                }
            });
            fileDialog.show();
        });

        $(".jcrop-setUp ul>li", that.$html).on("click", function(){
            $(".jcrop-setUp ul>li", that.$html).removeClass("curr");
            $(this).addClass("curr");
            var data = $(this).data("value"); 
            switch(data){
                case 0: that.options.aspectRatio = 'NaN'; break;
                case 1: that.options.aspectRatio = 1; break;
                case 2: that.options.aspectRatio = 1.3333333333333333; break;
                case 3: that.options.aspectRatio = 1.7777777777777777; break;
                case 4: break;
            } 
            if (data == 4) return;

            that.$image.cropper('setAspectRatio', that.options.aspectRatio);
        });

        that.$image.on('cropend.cropper', function (e) {
            if (e.action === 'crop') {
                e.preventDefault();
            }
        });

        that.$image.on('crop.cropper', function (e) {
            that.options.data["width"] = e.width;
            that.options.data["height"] = e.height;
            that.options.data["marginTop"] = -e.y;
            that.options.data["marginLeft"] = -e.x;
            that.options.onChange(that.options.data);
        });
	}

	that.initView();
	that.initEvent();
}