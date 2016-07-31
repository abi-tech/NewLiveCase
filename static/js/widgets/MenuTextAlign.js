var MenuTextAlign = function (options) {
	var that = this;
	that.defaultOptions = {
		data: { textAlign: null },
		list: [
			{ "name": "left", "value": "left" },
			{ "name": "center", "value": "center" },
			{ "name": "right", "value": "right" },
			{ "name": "justify", "value": "justify" }
		],
		onChange: function (data) {}
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="text-align-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="selected"{{ /if }}><a class="small"><div class="icon-x16 x-icon-{{ item.value }}"></div></a></li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	
	that.initView = function () {
		that.$html = $(template.compile(that.template)({ 
			items: that.options.list, 
			selected: that.options.data["textAlign"] 
		}));
	}

	that.initEvent = function () {
		$("li", that.$html).on("click", function (e) {
			e.stopPropagation();
			var $this = $(this);
			var idx = $("li", that.$html).index($this);
			$("li", that.$html).removeClass("selected");
			$this.addClass("selected");

			that.options.data["textAlign"] = that.options.list[idx]["value"];
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