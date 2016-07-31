; (function ($, window, document, undefined) {

	var data_colorpicker = { colors : [
		{ "color": "none", "src": "/static/images/colorpicker_colornone.png" },
		{ "color": "#FFFFFF" },
		{ "color": "#E5E5E5" },
		{ "color": "#CCCCCC" },
		{ "color": "#999999" },
		{ "color": "#808080" },
		{ "color": "#666666" },
		{ "color": "#333333" },
		{ "color": "#222222" },
		{ "color": "#000000" },
		{ "color": "#E5B8AE" },
		{ "color": "#F3CCCB" },
		{ "color": "#FCE5CB" },
		{ "color": "#FFF1CC" },
		{ "color": "#D9E9D2" },
		{ "color": "#C0F8F1" },
		{ "color": "#D0E0E4" },
		{ "color": "#CFE2F4" },
		{ "color": "#D9D2EA" },
		{ "color": "#EAD1DC" },
		{ "color": "#971200" },
		{ "color": "#FD2500" },
		{ "color": "#FE9900" },
		{ "color": "#FFFB00" },
		{ "color": "#2DF900" },
		{ "color": "#26FCCF" },
		{ "color": "#24FDFF" },
		{ "color": "#0433FF" },
		{ "color": "#9637FF" },
		{ "color": "#FC40FF" },
		{ "color": "#A52000" },
		{ "color": "#CA1B00" },
		{ "color": "#E5912A" },
		{ "color": "#F1C00A" },
		{ "color": "#6CA647" },
		{ "color": "#19A391" },
		{ "color": "#46818F" },
		{ "color": "#3D86C9" },
		{ "color": "#6652AA" },
		{ "color": "#A54F7A" },
		{ "color": "#5A1000" },
		{ "color": "#650800" },
		{ "color": "#773F00" },
		{ "color": "#7F5F00" },
		{ "color": "#294D09" },
		{ "color": "#0A7366" },
		{ "color": "#0D343E" },
		{ "color": "#073865" },
		{ "color": "#1E154F" },
		{ "color": "#4B1431" }
	]};

	var tpl_colorpicker = [
	'<div class="oni-colorpicker" style="height: 184px; display: none; position:absolute;">',
		'<div class="oni-colorpicker-color-list">',
		    '{{ each colors as color i}}',
			'<div class="color-box" style="background-color: {{ color.color }};">',
				'{{ if color.src != null }}',
				'<img src="{{ color.src }}">',
				'{{ /if }}',
			'</div>',
			'{{ /each }}',
			'<hr>',
			'<div class="switch">',
				'<div class="title">更多颜色</div>',
				'<div class="u-iphone-switch switch-bg"><div class="switch-btn"></div></div>',
			'</div>',
		'</div>',
	'</div>',
	].join('');

	var ColorPicker = function (element, options) {
		this.defaults = {
			offset: { top: 0, left: 0 },
			onShown: function () {},
			onChange: function(color){}
		};
		this.$element = $(element);
		this.options = $.extend(true, {}, this.defaults, options);
	}

	ColorPicker.prototype.init = function () {
		var that = this;

		var picker = template.compile(tpl_colorpicker)(data_colorpicker);

		var $wapper = $("body"), 
		    $picker = that.$picker = $(picker), 
		    options = this.options, 
		    $element = this.$element;

		this.$wapper = $wapper;
		this.$picker = $picker;

		that._calcPos();

		$wapper.append($picker);
		
		$element.on("click", function (e) {
			e.stopPropagation();
			that.show();
		});

		$("div.oni-colorpicker-color-list>div.color-box", $picker).on("click", function (e) {
			e.stopPropagation();
			var color = $(this).css("background-color");
			options.onChange(color);
			that.toggle();
		});

		$wapper.on("click", function (e) {
			that.hide();
		});
	}

	ColorPicker.prototype._calcPos = function () {
		var that = this;
		var windowWidth = $("body").width();
		var windowHeight = $("body").height();
		var pickerWidth = that.$picker.outerWidth();
		var pickerHeight = that.$picker.outerHeight();
		var elementWidth = that.$element.outerWidth();
		var elementHeight = that.$element.outerHeight();
		var elementTop = that.$element.offset().top;
		var elementLeft = that.$element.offset().left;

		that.$picker.css("top", elementTop + elementHeight + that.options.offset.top);
		that.$picker.css("left", elementLeft - pickerWidth + elementWidth + that.options.offset.left);
	}

	ColorPicker.prototype.show = function(){
		this._calcPos();
		this.$picker.show();
		this.options.onShown();
	}

	ColorPicker.prototype.hide = function(){
		this._calcPos();
		this.$picker.hide();
	}

	ColorPicker.prototype.toggle = function(){ 
		this._calcPos();
		this.$picker.toggle();
	}

	$.fn.colorpicker = function (options) {
        var colorPicker = new ColorPicker(this, options);
    	colorPicker.init();
    	return colorPicker;
    }
})(jQuery, window, document);