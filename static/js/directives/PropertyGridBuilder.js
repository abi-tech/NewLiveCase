var PropertyGridBuilder = function (options) {
	var that = this;

	that.defaultOptions = {

	}

	that.options = $.extend(true, {}, that.defaultOptions, options);
	$.extend(that, that.options);
}