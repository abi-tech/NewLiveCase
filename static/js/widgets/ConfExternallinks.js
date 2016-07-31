var ConfExternallinks = function (options) {
	var that = this;
	var defaultOptions = {
		data: {
			funType: null,
			funMode: null,
			address: null,
			phone: null,
			layer: null,
			link: null,
			pageSize: 1,
			text: null,
			icon: null,
			fontSize: null,
			fontColor: null,
			textAlign: null,
			fontWeight: null,
			fontStyle: null,
			textDecoration: null
		},
		onChange: function (data) { }
	};

	that.options = $.extend(true, {}, defaultOptions, options);

	var tpl = [
	'<section class="c-conf-section z-expand" style="display: block;">',
		'<section class="c-externallinks-edit"></section>',
	'</section>'
	].join('');

	var tpl_address = [
	'<div class="c-conf-row" style="display: none;">',
        '<div class="c-conf-row"><label class="c-input-label">网址链接</label></div>',
        '<div class="c-conf-row"><input class="address" placeholder="请输入链接地址，如http://www.liveapp.cn"></div>',
    '</div>'
	].join('');

	var tpl_phone = [
	'<div class="c-conf-row" style="display: none;">',
        '<div class="c-conf-row"><label class="c-input-label">电话号码</label></div>',
        '<div class="c-conf-row"><input class="phone" type="text" placeholder="请输入电话号码，如4000-168-906"></div>',
    '</div>'
	].join('');

	var tpl_layer = [
	'<div class="c-externallinks-pop" style="display: none;">',
        '<div class="c-externallinks-layer">',
            '<div class="c-conf-row">',
            	'<div class="u-image-wrap"><img /></div>',                         
            '</div>',
            '<ul class="u-layer-change-btn-wrap">',
                '<li class="change-btn-image">更换</li>',
                '<li class="change-btn-pre">预览</li>',
            '</ul>',
        '</div>',
    '</div>'
	].join('');
	//<select><option value="0" label="第 1 页">第 1 页</option></select>
	var tpl_link = [
	'<div class="c-conf-row redirectList" style="display: none;">',
        '<div class="c-conf-row"><label class="c-input-label">跳转至</label></div>',
        '<div class="c-dropdown-row"><select></select></div>',
    '</div>'  
	].join('');

	var tpl_switch = [
	'<div class="c-externallinks-switch">',
        '<div class="c-conf-row">',
        	'<div class="c-switch-box">',
        		'<ul class="u-tab">',
                    '<li><a href="javascript:void(0);">文字按钮</a></li>',
                    '<li><a href="javascript:void(0);">图标按钮</a></li>',                  
                '</ul>',
        	'</div>',
        '</div>',
    '</div>'
	].join('');

	var tpl_setting = [
	'<div class="c-externallinks-setting">',
		'<div class="c-input-row" style="display: none;">',
            '<div class="c-input-wrap"><input type="text" class="btnTxt"></div>',
            '<div class="c-font-setting">',
                '<ul>',
                    '<li class="dropdown font-size">',
                        '<a class="small"><div class="icon-x16 x-icon-font-size"></div></a>',
                    '</li>',
                    '<li class="font-color">',
                    	'<input class="dropdown font-color" style="color: rgb(255, 255, 255); background: rgb(255, 255, 255);" />',
                        '<div class="font-color-layer" style="background-color: rgb(255, 255, 255);"></div>',
                        '<a class="small"><div class="icon-x16 x-icon-font-color"></div></a>',
                    '</li>',
                    '<li class="dropdown text-align">',
                        '<a class="small"><div class="icon-x16 x-icon-text-align x-icon-center"></div></a>',
                    '</li>',
                    '<li class="dropdown font-style">',
                        '<a class="small"><div class="icon-x16 x-icon-font-style"></div></a>',
                    '</li>',
                '</ul>',
            '</div>',
        '</div>',
		'<div class="u-image-row" style="display: none;">',
            '<div class="u-image-wrap">',
                '<div class="u-image-small"><div class="u-image-icon"></div></div>',
            '</div>',
            '<div class="u-image-change-btn">更换图标</div>',
        '</div>',
    '</div>'
	].join('');

	var tpl_preview = [
		'<div class="previewPopLayer"><img /></div>'
	].join('');

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

	var menuFontColor;
	var menuFontSize = new MenuFontSize({ data: { fontSize: that.options.data["fontSize"] }, onChange: onFontSizeChnage });
	var menuTextAlign = new MenuTextAlign({ data: { textAlign: that.options.data["textAlign"] }, onChange: onTextAlignChnage });
	var menuFontStyle = new MenuFontStyle({ 
		data: { 
			fontWeight: that.options.data["fontWeight"],
			fontStyle: that.options.data["fontStyle"],
			textDecoration: that.options.data["textDecoration"]
		}, 
		onChange: onFontStyleChnage 
	});

	that.setTextAlign = function (data) {
		var $item = $(".x-icon-text-align", that.$setting);
		$item.removeClass();
		$item.addClass("icon-x16 x-icon-text-align x-icon-" + data);
	}

	that.refreshView = function () {
		$("input.btnTxt", that.$setting).val(that.options.data["text"]);
		$(".u-image-icon", that.$setting).css("background-image", "url('" + that.options.data["icon"] + "')");
		$(".font-color-layer", that.$setting).css("background-color", that.options.data["fontColor"]);
		that.setTextAlign(that.options.data["textAlign"]);

		$(".address", that.$address).val(that.options.data["address"]);
		$(".phone", that.$phone).val(that.options.data["phone"]);
		$(".u-image-wrap>img", that.$layer).prop("src", that.options.data["layer"]);
		// $(".layer", that.$layer).val(that.options.data["layer"]);
		// $(".link", that.$link).val(that.options.data["link"]);
	}

	that.initView = function () {
		that.$html = $(tpl);
		that.$edit = $(".c-externallinks-edit", that.$html);
		that.$address = $(tpl_address);
		that.$phone = $(tpl_phone);
		that.$layer = $(tpl_layer);
		that.$link = $(tpl_link);
		that.$select = $("select", that.$link);
		that.$switch = $(tpl_switch);
		that.$ulTab = $("ul.u-tab", that.$switch);
		that.$setting = $(tpl_setting);
		that.$textMode = $(".c-input-row", that.$setting);
		that.$iconMode = $(".u-image-row", that.$setting);
		
		that.$edit.append(that.$address);
		that.$edit.append(that.$phone);
		that.$edit.append(that.$layer);
		that.$edit.append(that.$link);
		that.$edit.append(that.$switch);
		that.$edit.append(that.$setting);

		$(".c-font-setting", that.$setting).append(menuFontSize.$html);
		$(".c-font-setting", that.$setting).append(menuTextAlign.$html);
		$(".c-font-setting", that.$setting).append(menuFontStyle.$html);

		for (var i = 0; i < that.options.data["pageSize"]; i++) {
			that.$select.append('<option value="' + i + '">第 ' + (i + 1) + ' 页</option>');
		}

		switch(that.options.data.funType){
			case "0": that.setViewAddressType(); break;
			case "1": that.setViewPhoneType(); break;
			case "2": that.setViewLayerType(); break;
			case "3": that.setViewLinkType(); break;
		}

		switch(that.options.data.funMode){
			case "text": that.setViewTextMode(); break;
			case "icon": that.setViewIconMode(); break;
		}
		that.refreshView();
	}

	that.initEvent = function () {
		$("li.font-size", that.$setting).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.show();
			menuFontColor.hide();
			menuTextAlign.hide();
			menuFontStyle.hide();
		});

		menuFontColor = $("li.font-color", that.$setting).colorpicker({
			offset: { top: 0, left: 140 },
			onShown: function () {
				menuFontSize.hide();
				menuTextAlign.hide();
				menuFontStyle.hide();
			},
			onChange: function(color){
				that.options.data["fontColor"] = color;
				$(".font-color-layer", that.$setting).css("background-color", color);
				that.options.onChange(that.options.data);
			}
		});

		$("li.text-align", that.$setting).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.hide();
			menuFontColor.hide();
			menuTextAlign.show();
			menuFontStyle.hide();
		});

		$("li.font-style", that.$setting).on("click", function (e) {
			e.stopPropagation();
			menuFontSize.hide();
			menuFontColor.hide();
			menuTextAlign.hide();
			menuFontStyle.show();
		});

		$("li:eq(0)", that.$ulTab).on("click", function (e) {
			that.setViewTextMode();
			that.options.data["funMode"] = "text";
			that.options.onChange(that.options.data);
		});

		$("li:eq(1)", that.$ulTab).on("click", function (e) {
			that.setViewIconMode();
			that.options.data["funMode"] = "icon";
			that.options.onChange(that.options.data);
		});

		$(".u-image-change-btn", that.$setting).on("click", function (e) {
			var fileDialog = new FileDialog({
				type: "image",
				onChosenEnd: function (item) {
					that.options.data["icon"] = item.options.url;
					that.options.onChange(that.options.data);
					that.refreshView();
				}
			});
			fileDialog.show();
		});

		$("input.btnTxt", that.$setting).on("keyup", function (e) { 
			that.options.data["text"] = $(this).val();
			that.options.onChange(that.options.data);
		});

		$(".address", that.$address).on("keyup", function (e) { 
			that.options.data["address"] = $(this).val();
			that.options.onChange(that.options.data);
		});

		$(".phone", that.$phone).on("keyup", function (e) {
			that.options.data["phone"] = $(this).val();
			that.options.onChange(that.options.data);
		});

		$(".change-btn-image", that.$layer).on("click", function (e) {
			var fileDialog = new FileDialog({
				type: "image",
				onChosenEnd: function (item) {
					that.options.data["layer"] = item.options.url;
					that.options.onChange(that.options.data);
					that.refreshView();
				}
			});
			fileDialog.show();
		});

		$(".change-btn-pre", that.$layer).on("click", function (e) {
			e.stopPropagation();
			var $preview = $(tpl_preview);
			$preview.find("img").prop("src", that.options.data["layer"]);
			$("#editorFrame").append($preview);
		});
		
		that.$select.on("change", function (e) {
			that.options.data["link"] = $(this).val();
			that.options.onChange(that.options.data);
		});

		$("body").on("click", function (e) {
			$("#editorFrame .previewPopLayer").remove();
		});
	}

	that.setViewAddressType = function () {
		that.$address.show();
		that.$phone.hide();
		that.$layer.hide();
		that.$link.hide();
	}

	that.setViewPhoneType = function () {
		that.$address.hide();
		that.$phone.show();
		that.$layer.hide();
		that.$link.hide();
	}

	that.setViewLayerType = function () {
		that.$address.hide();
		that.$phone.hide();
		that.$layer.show();
		that.$link.hide();
	}

	that.setViewLinkType = function () {
		that.$address.hide();
		that.$phone.hide();
		that.$layer.hide();
		that.$link.show();
	}

	that.setViewTextMode = function () {
		$("li>a", that.$ulTab).removeClass("z-active");
		$("li:eq(0)>a", that.$ulTab).addClass("z-active");

		this.$textMode.show(); 
		this.$iconMode.hide();
	}

	that.setViewIconMode = function () {
		$("li>a", that.$ulTab).removeClass("z-active");
		$("li:eq(1)>a", that.$ulTab).addClass("z-active");
		
		this.$textMode.hide(); 
		this.$iconMode.show();
	}

	that.initView();
	that.initEvent();
}