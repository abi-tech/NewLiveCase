var ConfSingletext = function (options) {
	var that = this;
	var defaultOptions = {
		data: {
			text: null,
			fontSize: null,
			fontColor: null,
			textAlign: null,
			fontWeight: null,
			fontStyle: null,
			textDecoration: null,
			lineHeight: null,
			fontFamily: null
		},
		onChange: function (data) { }
	};

	var tpl = [
	'<section class="c-conf-section z-expand" style="display: block;">',
	    '<section class="u-conf-section c-singletext">',
	        '<div class="c-conf-row"><textarea placeholder="亲，在这里输入文本哦"></textarea></div>',
	        '<div class="c-conf-row c-conf-row-1">',
	            '<ul class="u-tab">',
	                '<li class="dropdown font-size">',
	                    '<a class="small"><div class="icon-x16 x-icon-font-size"></div></a>',
	                '</li>',
	                '<li class="font-color">',
	                    '<input class="dropdown font-color" style="color: rgb(255, 255, 255); background: rgb(51, 51, 51);">',
	                    '<div class="font-color-layer" style="background-color: rgb(51, 51, 51);"></div>',
	                    '<a class="small"><div class="icon-x16 x-icon-font-color"></div></a>',
	                '</li>',
	                '<li class="dropdown text-align">',
	                    '<a class="small"><div class="icon-x16 x-icon-text-align x-icon-center"></div></a>',
	                '</li>',
	                '<li class="dropdown line-height">',
	                    '<a class="small"><div class="icon-x16 x-icon-line-height"></div></a>',
	                '</li>',
	            '</ul>',
	        '</div>',
	        '<div class="c-conf-row c-conf-row-2">',
	            '<div class="c-input-box box-lf">',
	                '<ul class="u-tab">',
	                    '<li class="dropdown font-face">',
	                        '<a class="small"><div class="icon-x16 x-icon-display x-icon-SimHei"></div></a>',
	                    '</li>',
	                '</ul>',
	            '</div>',
	            '<div class="c-input-box box-rf"></div>',
	        '</div>',
	    '</section>',
	'</section>'
	].join('');

	that.options = $.extend({}, defaultOptions, options);

	function onFontSizeChnage(data) {
		$.extend(that.options.data, data);
		that.options.onChange(that.options.data);
	}

	function onTextAlignChnage(data) {
		$.extend(that.options.data, data);
		that.setTextAlign(data["textAlign"]);
		that.options.onChange(that.options.data);
	}

	function onFontStyleChnage(data) {
		$.extend(that.options.data, data);
		that.options.onChange(that.options.data);
	}

	function onLineHeightChnage(data) {
		$.extend(that.options.data, data);
		that.options.onChange(that.options.data);
	}

	function onFontFamilyChnage(data) {
		$.extend(that.options.data, data);
		that.setFontFamily(data["fontFamily"]);
		that.options.onChange(that.options.data);
	}

	var menuFontColor;
	var menuFontSize = new MenuFontSize({ data: { fontSize: that.options.data["fontSize"] }, onChange: onFontSizeChnage });
	var menuTextAlign = new MenuTextAlign({ data: { textAlign: that.options.data["textAlign"] }, onChange: onTextAlignChnage });
	var menuLineHeight = new MenuLineHeight({ data: { lineHeight: that.options.data["lineHeight"] }, onChange: onLineHeightChnage });
	var menuFontFamily = new MenuFontFamily({ data: { fontFamily: that.options.data["fontFamily"] }, onChange: onFontFamilyChnage });
	var menuFontStyle = new MenuFontStyle({ 
		mode: "tab",
		data: { 
			fontWeight: that.options.data["fontWeight"],
			fontStyle: that.options.data["fontStyle"],
			textDecoration: that.options.data["textDecoration"]
		}, 
		onChange: onFontStyleChnage 
	});

	that.setTextAlign = function (data) {
		var $item = $(".x-icon-text-align", that.$html);
		$item.removeClass();
		$item.addClass("icon-x16 x-icon-text-align x-icon-" + data);
	}

	that.setFontFamily = function (data) {
		var $item = $(".x-icon-display", that.$html);
		$item.removeClass();
		$item.addClass("icon-x16 x-icon-display x-icon-" + data);
	}

	that.refreshView = function () {
		$(".font-color-layer", that.$html).css("background-color", that.options.data["fontColor"]);
		that.setTextAlign(that.options.data["textAlign"]);
		that.setFontFamily(that.options.data["fontFamily"]);
		$(".c-conf-row>textarea", that.$html).val(that.options.data["text"]);
		
	}

	that.initView = function () {
		that.$html = $(tpl);
		that.$row1 = $(".c-conf-row-1", that.$html);
		that.$row2 = $(".c-conf-row-2", that.$html);

		that.$row1.append(menuFontSize.$html);
		that.$row1.append(menuTextAlign.$html);
		that.$row1.append(menuLineHeight.$html);
		$(".c-input-box:eq(0)", that.$row2).append(menuFontFamily.$html);
		$(".c-input-box:eq(1)", that.$row2).append(menuFontStyle.$html);

		that.refreshView();
	}

	that.initEvent = function () {
		$("textarea", that.$html).on("keyup", function (e) { 
			that.options.data["text"] = $(this).val();
			that.options.onChange(that.options.data);
		});

		$("ul.u-tab>li:eq(0)", that.$row1).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.show();
			menuFontColor.hide();
			menuTextAlign.hide();
			menuLineHeight.hide();
			menuFontFamily.hide();
		});

		menuFontColor = $("li.font-color", that.$html).colorpicker({
			offset: { top: 0, left: 140 },
			onShown: function () {
				menuFontSize.hide();
				menuTextAlign.hide();
				menuLineHeight.hide();
				menuFontFamily.hide();
			},
			onChange: function(color){
				that.options.data["fontColor"] = color;
				$(".font-color-layer", that.$setting).css("background-color", color);
				that.options.onChange(that.options.data);
			}
		});

		$("ul.u-tab>li:eq(2)", that.$row1).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.hide();
			menuFontColor.hide();
			menuTextAlign.show();
			menuLineHeight.hide();
			menuFontFamily.hide();
		});

		$("ul.u-tab>li:eq(3)", that.$row1).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.hide();
			menuFontColor.hide();
			menuTextAlign.hide();
			menuLineHeight.show();
			menuFontFamily.hide();
		});

		$(".c-input-box:eq(0)", that.$row2).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.hide();
			menuFontColor.hide();
			menuTextAlign.hide();
			menuLineHeight.hide();
			menuFontFamily.show();
		});
	}

	that.initView();
	that.initEvent();
}