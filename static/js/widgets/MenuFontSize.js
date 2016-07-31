var MenuFontSize = function (options) {
	var that = this;
	that.defaultOptions = {
		data: { fontSize: null },
		list: [
			{ "name": "18", "value": "18" },
			{ "name": "20", "value": "20" },
			{ "name": "22", "value": "22" },
			{ "name": "24", "value": "24" },
			{ 'name': "26", "value": "26" },
			{ "name": "28", "value": "28" },
			{ "name": "30", "value": "30" },
			{ "name": "32", "value": "32" },
			{ "name": "34", "value": "34" },
			{ "name": "36", "value": "36" },
			{ "name": "38", "value": "38" },
			{ "name": "40", "value": "40" },
			{ "name": "42", "value": "42" },
			{ "name": "44", "value": "44" },
			{ "name": "46", "value": "46" },
			{ "name": "48", "value": "48" },
			{ "name": "50", "value": "50" },
			{ "name": "52", "value": "52" },
			{ "name": "54", "value": "54" },
			{ "name": "56", "value": "56" },
			{ "name": "58", "value": "58" },
			{ "name": "60", "value": "60" },
			{ "name": "62", "value": "62" },
			{ "name": "64", "value": "64" },
			{ "name": "72", "value": "72" },
			{ "name": "96", "value": "96" },
			{ "name": "100", "value": "100" },
			{ "name": "200", "value": "200" },
			{ "name": "300", "value": "300" },
			{ "name": "400", "value": "400" },
			{ "name": "500", "value": "500" }
		],
		onChange: function (data) {}
	};
	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="font-size-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li value="{{ item.value }}" {{ if selected == item.value }}class="selected"{{ /if }}>{{ item.name }}</li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.initView = function () {
		that.$html = $(template.compile(that.template)({ 
			items: that.options.list, 
			selected: that.options.data["fontSize"]
		}));
	}
	
	that.initEvent = function () {
		$("li", that.$html).on("click", function (e) {
			e.stopPropagation();
			var $this = $(this);
			var idx = $("li", that.$html).index($this);
			$("li", that.$html).removeClass("selected");
			$this.addClass("selected");

			that.options.data["fontSize"] = that.options.list[idx]["value"];
			that.options.onChange(that.options.data);
			that.$html.hide();
		});

		$("body").on("click", function (e) {
			that.hide();
		});
	}
	
	that.hide = function () {
		this.$html.hide();
	}

	that.show = function () {
		this.$html.show();
	}

	that.initView();
	that.initEvent();
}