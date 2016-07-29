var Switcher = function (options) {
	var that = this;
	var defaultOptions = {
		val: false,
		onChange: function(data){ }
	};

	that.options = $.extend({}, defaultOptions, options);

	var tpl = '<div class="f-float-r flag"></div>'

	that.initView = function () {
		that.$html = $(tpl);
		that.$html.addClass(that.options.val? "icon-x40-flag-on" : "icon-x40-flag-off");
	}

	that.initEvent = function () {
		that.$html.on("click", function (e) {
			that.options.val = !that.options.val;
			that.$html.removeClass("icon-x40-flag-off");
			that.$html.removeClass("icon-x40-flag-on");
			that.$html.addClass(that.options.val? "icon-x40-flag-on" : "icon-x40-flag-off");
			that.options.onChange(that.options.val);
		});
	}

	that.initView();
	that.initEvent();
}