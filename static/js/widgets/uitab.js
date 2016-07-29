var UITab = function (options) {
	var that = this;
	var defaultOptions = {
		active: 0,
		list: [], //{ id: 0, name: "", dom: null }
		onChange: function (data) { }
	}

	that.options = $.extend({}, defaultOptions, options);

	var $ul = $('<ul class="u-tab z-singleLine">');

	that.show = function (idx) {
		$("li>a", $ul).removeClass();
		$("li:eq(" + idx + ")>a", $ul).addClass("z-active");

		var item = that.options.list[idx];

		$.each(that.options.list, function (i, n) {
			n["dom"] && n["dom"].hide();
		});
		item.dom && item.dom.show();
	}

	that.initView = function () {
		$.each(that.options.list, function (i, n) {
			var $li = $("<li>");
			var $a = $('<a href="javascript:void(0);"></a>');
			$a.text(n["name"]);
			$li.append($a);
			$ul.append($li);
		});

		that.show(that.options.active);
		that.$html = $ul;
	}

	that.initEvent = function () {
		$("li>a", $ul).on("click", function (e) {
			var idx = $("li>a", $ul).index(this);
			that.show(idx);
		});
	}

	that.initView();
	that.initEvent();
}