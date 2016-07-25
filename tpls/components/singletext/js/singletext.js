var ConfFontSize = function (options) {
	var that = this;
	that.defaultOptions = {
		selected: "22",
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
		selectEnd: function (option) {
			console.log(option);
		}
	};
	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="font-size-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li value="{{ item.value }}" {{ if selected == item.value }}class="selected"{{ /if }}>{{ item.name }}</li>',
			'{{ /each }}',
		'</ul>'
	].join('');
	that.$html = $(template.compile(that.template)({ items: that.options.list, selected: that.options.selected }));

	$("li", that.$html).on("click", function (e) {
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});
}

var ConfFontColor = function (options) {
	// body...
}

var ConfTextAlign = function (options) {
	var that = this;
	that.defaultOptions = {
		selected: "left",
		list: [
			{ "name": "left", "value": "left" },
			{ "name": "center", "value": "center" },
			{ "name": "right", "value": "right" },
			{ "name": "justify", "value": "justify" }
		],
		selectEnd: function (option) {
			console.log(option);
		}
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="text-align-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="selected"{{ /if }}><a class="small"><div class="icon-x16 x-icon-{{ item.value }}"></div></a></li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.$html = $(template.compile(that.template)({ items: that.options.list, selected: that.options.selected }));

	$("li", that.$html).on("click", function (e) {
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});
}

var ConfLineHeight = function (options) {
	var that = this;
	that.defaultOptions = {
		selected: "1.0",
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
		selectEnd: function (option) {
			console.log(option);
		}
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="line-height-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="selected"{{ /if }} value="{{ item.value }}">{{ item.name }}</li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.$html = $(template.compile(that.template)({ items: that.options.list, selected: that.options.selected }));

	$("li", that.$html).on("click", function (e) {
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});
}

var ConfFontFamily = function (options) {
	var that = this;
	that.defaultOptions = {
		selected: "SimHei",
		list: [
			{ "name": "SimHei", "value": "SimHei" },
			{ "name": "MFShangHei_Noncommercial-ExLight", "value": "MFShangHei_Noncommercial-ExLight" },
			{ "name": "maobi-Regular", "value": "maobi-Regular" },
			{ "name": "SentyMaruko", "value": "SentyMaruko" },
			{ "name": "DFPWaWaW5", "value": "DFPWaWaW5" }
		],
		selectEnd: function (option) {
			console.log(option);
		}
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="dropdown-list" type="font-list" style="display: none;">',
			'{{ each items as item i }}',
			'<li {{ if selected == item.value }}class="x-icon-{{ item.value }} selected"{{ else }}class="x-icon-{{ item.value }}"{{ /if }}"></li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.$html = $(template.compile(that.template)({ items: that.options.list, selected: that.options.selected }));

	$("li", that.$html).on("click", function (e) {
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});
}

var ConfFontBIU = function (options) {
	var that = this;
	that.defaultOptions = {
		selected: [],
		list: [ 
			{ "name": "b", "value": "b"},
			{ "name": "i", "value": "i"},
			{ "name": "u", "value": "u"},
		],
		selectEnd: function (items) {
			console.log(items);
		}
	};

	that.options = $.extend(true, {}, that.defaultOptions, options);
	that.template = [
		'<ul class="u-tab">',
			'{{ each items as item i }}',
			'<li class=""><a class="small"><div class="icon-x16 x-icon-{{ value }}"></div></a></li>',
			'{{ /each }}',
		'</ul>'
	].join('');

	that.$html = $(template.compile(that.template)({ items: that.options.list }));

	$("li", that.$html).on("click", function (e) {
		var $this = this;
		$this.toggleClass("selected");

		var items = $.map($("li", that.$html), function(n){
			console.log(n);
			return n;
		});
		that.options.selectEnd(items);
		that.$html.hide();
	});
}

var Singletext = ExClass(H5ComponentBase, {
    initialize: function($super, options) { 
    	var that = this;
        
        that.defaultOptions = {
        	type: "singletext",
        	x: 111.5,
        	y: 108,
        	width: 417,
        	height: 80,
        	text: "右侧输入文本",
        	containerCss: {
        		"line-height": 1
        	},
        	componentCss: {
				"border-width": "0px", 
				"border-color": "rgba(204, 204, 204, 0)", 
				"border-radius": "0px", 
				"transform": "rotate(0deg)", 
				"opacity": 1, 
				"background-image": "none", 
				"background-color": "rgba(225, 225, 225, 0)"
			},
			innerCss: {
				"line-height": 1.5,
				"text-align": "center",
				"font-size": "2.5em",
				"font-family": "SimHei",
				"color": "rgb(51, 51, 51)"
			}
        }

		that.componentTemplate = '<div inside-styles="" class="text-wrap" ng-style="component.componentCss"></div>';
		that.innerTemplate = '<div class="text-content" ng-style="component.innerCss" ng-bind="component.text"></div>';
		that.configTemplate = '<div config-position></div>';

		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		//that.$config = $(that.configTemplate);
		that.options = $.extend(true, {}, that.defaultOptions, options);

		$super(that.options);
		$.extend(that, that.options);
		that.$container.addClass("c-single-text");
		that.buildConfig();
		if(typeof that.options.text === 'string' && that.options.text.length > 0){
        	that.$inner.text(that.options.text);
        	that.$viewInner.text(that.options.text);
		}
        else{
        	that.$inner.text('右侧输入文本');
        	that.$viewInner.text('右侧输入文本');
        }
    },
    buildConfig : function () {
    	var that = this;

    	var confTemplate = [
    		'<section class="c-conf-section z-expand" style="display: block;">',
    			'<section class="u-conf-section c-singletext">',
	    			'<div class="c-conf-row"><textarea placeholder="亲，在这里输入文本哦"></textarea></div>',
	    			'<div class="c-conf-row c-conf-row-1">',
	    				'<ul class="u-tab">',
				            '<li class="dropdown font-size">',
				                '<a class="small"><div class="icon-x16 x-icon-font-size"></div></a>',
				            '</li>',
				            '<li class="font-color">',
				                '<input class="dropdown font-color" style="color: rgb(0, 0, 0); background: rgb(4, 51, 255);">',
				                '<div class="font-color-layer" style="background-color: rgb(4, 51, 255);"></div>',
				                '<a class="small"><div class="icon-x16 x-icon-font-color"></div></a>',
				            '</li>',
				            '<li class="dropdown text-align">',
				                '<a class="small"><div class="icon-x16 x-icon-text-align x-icon-center"></div></a>',
				            '</li>',
				            '<li class="dropdown line-height">',
				                '<a class="small"><div class="icon-x16 x-icon-line-height"></div></a>',
				            '</li>',
				        '</ul>',
	    			'</div>',
	    			'<div class="c-conf-row c-conf-row-2">',
				        '<div class="c-input-box box-lf">',
				            '<ul class="u-tab">',
				                '<li class="dropdown font-face">',
				                    '<a class="small"><div class="icon-x16 x-icon-display x-icon-SimHei"></div></a>',
				                '</li>',
				            '</ul>',
				        '</div>',
				        '<div class="c-input-box box-rf">',
				            '<ul class="u-tab">',
				                '<li><a class="small"><div class="icon-x16 x-icon-b"></div></a></li>',
				                '<li><a class="small"><div class="icon-x16 x-icon-i"></div></a></li>',
				                '<li><a class="small"><div class="icon-x16 x-icon-u"></div></a></li>',
				            '</ul>',
				        '</div>',
				    '</div>',
	    		'</section>',
    		'</section>'
    	].join('');

    	var confFontSize = new ConfFontSize();
    	var confTextAlign = new ConfTextAlign();
    	var confLineHeight = new ConfLineHeight();
    	var confFontFamily = new ConfFontFamily();
    	var $conf = $(confTemplate);
    	$(".c-conf-row.c-conf-row-1", $conf).append(confFontSize.$html);
    	$(".c-conf-row.c-conf-row-1", $conf).append(confTextAlign.$html);
    	$(".c-conf-row.c-conf-row-1", $conf).append(confLineHeight.$html);
    	$(".c-conf-row.c-conf-row-2 div:eq(0)", $conf).append(confFontFamily.$html);

    	$(".dropdown.font-size", $conf).on("click", function (e) {
    		confFontSize.$html.show();
    		confTextAlign.$html.hide();
    		confLineHeight.$html.hide();
    		confFontFamily.$html.hide();
    	});

    	$(".dropdown.text-align", $conf).on("click", function (e) {
    		confFontSize.$html.hide();
    		confTextAlign.$html.show();
    		confLineHeight.$html.hide();
    		confFontFamily.$html.hide()
    	});

    	$(".dropdown.line-height", $conf).on("click", function (e) {
    		confFontSize.$html.hide();
    		confTextAlign.$html.hide();
    		confLineHeight.$html.show();
    		confFontFamily.$html.hide()
    	});

    	$(".dropdown.font-face", $conf).on("click", function (e) {
    		confFontSize.$html.hide();
    		confTextAlign.$html.hide();
    		confLineHeight.$html.hide();
    		confFontFamily.$html.show()
    	});

    	var tpl = [
    		that.confHeaderTemplate,
    		that.confSettingTemplate,
    		that.confFacadeTemplate,
    		that.confAnimationTemplate,
    		that.confPositionTemplate
    	].join('');

    	that.$config = $('<section class="c-config-wapper"></section>');
    	that.$config.append($(that.confHeaderTemplate));
    	that.$config.append($conf);
    }
});