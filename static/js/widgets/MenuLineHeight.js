var MenuLineHeight = function (options) {
	var that = this;
	that.defaultOptions = {
		data: { lineHeight: null } ,
		list: [
			{ "name": "1.0", "value": "1.0" },
			{ "name": "1.15", "value": "1.15" },
			{ "name": "1.5", "value": "1.5" },
			{ "name": "2.0", "value": "2.0" },
			{ "name": "2.5", "value": "2.5" },
			{ "name": "3.0", "value": "3.0" },
			{ "name": "3.5", "value": "3.5" },
			{ "name": "4.0", "value": "4.0" },
			{ "name": "4.5", "value": "4.5" },
			{ "name": "5.0", "value": "5.0" },
		],
		onChange: function (data) { }
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	var tpl = [
		'<ul class="dropdown-list" type="line-height-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="selected"{{ /if }} value="{{ item.value }}">{{ item.name }}</li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.initView = function () {
		that.$html = $(template.compile(tpl)({ 
			items: that.options.list, 
			selected: that.options.data["lineHeight"] 
		}));
	}

	that.initEvent = function () {
		$("li", that.$html).on("click", function (e) {
			e.stopPropagation();
			var $this = $(this);
			var idx = $("li", that.$html).index($this);
			$("li", that.$html).removeClass("selected");
			$this.addClass("selected");
			that.options.data["lineHeight"] = that.options.list[idx]["value"];
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