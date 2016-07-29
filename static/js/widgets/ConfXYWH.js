var ConfXYWH = function (options) {
	var that = this;

	var defaultOptions = {
		data:{ "left": 0, "top": 0, "width": 0, "height": 0 },
		onChange: function (data) { }
	};

	that.options = $.extend({}, defaultOptions, options);

	var tpl = [
	'<section class="c-conf-section c-conf-common">',
	    '<div class="c-conf-row c-conf-row-3">',
	        '<label class="c-input-label" for="left">位置</label>',
	        '<div class="c-input-box">',
	            '<label class="u-label f-mr-9">X轴</label>',
	            '<input type="text" id="left" class="u-textbox f-mr-40" size="10">',
	            '<label class="u-label f-mr-9" for="top">Y轴</label>',
	            '<input type="text" id="top" class="u-textbox" size="10">',
	        '</div>',
	    '</div>',
	    '<div class="c-conf-row">',
	        '<label class="c-input-label" for="width">大小</label>',
	        '<div class="c-input-box">',
	            '<label class="u-label f-mr-9">宽</label>',
	            '<input type="text" id="width" class="u-textbox f-mr-40" size="10">',
	            '<label class="u-label f-mr-9">高</label>',
	            '<input type="text" id="height" class="u-textbox" size="10">',
	        '</div>',
	    '</div>',
	'</section>'
	].join('');

	that.setData = function (data) {
		$.extend(that.options.data, data);

		that.$left.val(that.options.data["left"]);
		that.$top.val(that.options.data["top"]);
		that.$width.val(that.options.data["width"]);
		that.$height.val(that.options.data["height"]);
	}

	that.initView = function () {
		that.$html = $(tpl);
		that.$left = $("#left", that.$html);
		that.$top = $("#top", that.$html);
		that.$width = $("#width", that.$html);
		that.$height = $("#height", that.$html);

		that.$left.val(that.options.data["left"]);
		that.$top.val(that.options.data["top"]);
		that.$width.val(that.options.data["width"]);
		that.$height.val(that.options.data["height"]);
	}

	that.initEvent = function () {
		that.$left.on("keyup", function (e) {
			var val = $(this).val();
        	val = val.replace(/[^0-9-]+/,'');
        	$(this).val(val);
        	that.options.data["left"] = parseFloat(val);
			that.options.onChange(that.options.data);
		});

		that.$top.on("keyup", function (e) {
			var val = $(this).val();
        	val = val.replace(/[^0-9-]+/,'');
        	$(this).val(val);
        	that.options.data["top"] = parseFloat(val);
			that.options.onChange(that.options.data);
		});

		that.$width.on("keyup", function (e) {
			var val = $(this).val();
        	val = val.replace(/[^0-9-]+/,'');
        	$(this).val(val);
        	that.options.data["width"] = parseFloat(val);
			that.options.onChange(that.options.data);
		});

		that.$height.on("keyup", function (e) {
			var val = $(this).val();
        	val = val.replace(/[^0-9-]+/,'');
        	$(this).val(val);
        	that.options.data["height"] = parseFloat(val);
			that.options.onChange(that.options.data);
		});
	}

	that.initView();
	that.initEvent();
}