var MenuFontStyle = function (options) {
	var that = this;
	var defaultOptions = {
		mode: "dropdown", //dropdown tab
		data: {
			fontWeight: "",
			fontStyle: "",
			textDecoration: ""
		},
		onChange: function (data) { }
	};

	var tpl = [
	'<ul>',
        '<li><a class="small"><div class="icon-x16 x-icon-b"></div></a></li>',
        '<li><a class="small"><div class="icon-x16 x-icon-i"></div></a></li>',
        '<li><a class="small"><div class="icon-x16 x-icon-u"></div></a></li>',
    '</ul>'
	].join('');

	that.options = $.extend({}, defaultOptions, options);

	that.initView = function () {
		that.$html = $(tpl);

		if (that.options.mode === 'dropdown') {
			that.$html.addClass("dropdown-list");
			that.$html.attr("type", "font-style-list");
			that.$html.hide();
		}else if (that.options.mode === 'tab'){
			that.$html.addClass("u-tab");
			that.$html.show();
		}

		if (that.options.data["fontWeight"] === 'bold') {
			$("li:eq(0)", that.$html).addClass("selected");
		}
		if (that.options.data["fontStyle"] === 'italic') {
			$("li:eq(1)", that.$html).addClass("selected");
		}
		if (that.options.data["textDecoration"] === 'underline') {
			$("li:eq(2)", that.$html).addClass("selected");
		}
	}

	function onChange(){
		that.options.onChange(that.options.data);
		if (that.options.mode === 'dropdown') {
			that.$html.hide();
		}
	}

	that.initEvent = function () {
		$("li:eq(0)", that.$html).on("click", function (e) {
			$(this).toggleClass("selected");

			if ($(this).hasClass("selected")) {
				that.options.data["fontWeight"] = "bold";
			}else{
				that.options.data["fontWeight"] = "";
			}
			onChange();
		});

		$("li:eq(1)", that.$html).on("click", function (e) {
			$(this).toggleClass("selected");

			if ($(this).hasClass("selected")) {
				that.options.data["fontStyle"] = "italic";
			}else{
			    that.options.data["fontStyle"] = "";
			}
			onChange();
		});

		$("li:eq(2)", that.$html).on("click", function (e) {
			$(this).toggleClass("selected");

			if ($(this).hasClass("selected")) {
				that.options.data["textDecoration"] = "underline";
			}else{
				that.options.data["textDecoration"] = "";
			}
			onChange();
		});

		if (that.options.mode === 'dropdown') {
			$("body").on("click", function (e) {
				that.hide();
			});
		}
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