var Plugin = function (options) {
	var that = this;

	var defaultOptions = {

	};

	that.options = $.extend({}, defaultOptions, options);

	var tpl = [].join('');

	that.initView = function () {
		that.$html = $(tpl);
	}

	that.initEvent = function () {

	}

	that.initView();
	that.initEvent();
}