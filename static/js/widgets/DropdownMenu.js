;(function ($, window, document) {
	var DropdownMenu = function (element, options) {
		var that = this;
		var defaultOptions = {
			value: "",
			width: 200,
			data: []
		};
		that.$element = $(element);
		that.options = $.extend(true, {}, defaultOptions, options);

		var tpl_source = [
		'<div class="oni-dropdown u-select">',
			'<div class="oni-dropdown-source">',
				'<div class="oni-dropdown-input u-select-input"></div>',
				'<div class="oni-dropdown-icon-wrap">',
					'<i class="oni-dropdown-icon oni-icon oni-icon-angle-up" style="display: none;"></i>',
					'<i class="oni-dropdown-icon oni-icon oni-icon-angle-down" style="display: block;"></i>',
				'</div>',
			'</div>',
		'</div>'
		].join('');

		//<div class="oni-dropdown-item u-select-items" title="鹰翼酷跑">鹰翼酷跑</div>
		var tpl_data_wrapper = [
		'<div class="oni-dropdown oni-dropdown-menu">',
		    '<div class="oni-dropdown-menu-inner">',
		        '<div class="oni-scrollbar-scroller"></div>',
		    '</div>',
		'</div>'
		].join('');

		that.init = function () {
			that.$html = $(tpl_source);
			that.$element.replaceWidth(that.$html);
		}

		that.init();
	}

	$.fn.extend({
        "dropdown": function (options) {
            return new DropdownMenu(this, options);
        }
    });
})(jQuery, window, document);

