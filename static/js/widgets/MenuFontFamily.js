var MenuFontFamily = function (options) {
	var that = this;

	that.defaultOptions = {
		data: { fontFamily: "" },
		list: [
			{ "name": "SimHei", "value": "SimHei" },
			{ "name": "MFShangHei_Noncommercial-ExLight", "value": "MFShangHei_Noncommercial-ExLight" },
			{ "name": "maobi-Regular", "value": "maobi-Regular" },
			{ "name": "SentyMaruko", "value": "SentyMaruko" },
			{ "name": "DFPWaWaW5", "value": "DFPWaWaW5" }
		],
		onChange: function (data) { }
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	var tpl = [
		'<ul class="dropdown-list" type="font-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="x-icon-{{ item.value }} selected"{{ else }}class="x-icon-{{ item.value }}"{{ /if }}"></li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.initView = function () {
		that.$html = $(template.compile(tpl)({ 
			items: that.options.list, 
			selected: that.options.data["fontFamily"] 
		}));
	}

	that.initEvent = function () {
		$("li", that.$html).on("click", function (e) {
			e.stopPropagation();
			var $this = $(this);
			var idx = $("li", that.$html).index($this);
			$("li", that.$html).removeClass("selected");
			$this.addClass("selected");
			that.options.data["fontFamily"] = that.options.list[idx]["value"];
			that.options.onChange(that.options.data);
			that.$html.hide();
		});

		$("body").on("click", function (e) {
			that.$html.hide();
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