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
		e.stopPropagation();
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});

	$("body").on("click", function (e) {
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
		e.stopPropagation();
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});

	$("body").on("click", function (e) {
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
		e.stopPropagation();
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});

	$("body").on("click", function (e) {
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
		e.stopPropagation();
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		$("li", that.$html).removeClass("selected");
		$this.addClass("selected");
		that.options.selectEnd(that.options.list[idx]);
		that.$html.hide();
	});

	$("body").on("click", function (e) {
		that.$html.hide();
	});
}

/**
* 功能： 封装固定结构的布局类
**/
var UTab = function (options) {
	var that = this;

	var defaultOptions = {
		enable: false,
		single: true,
		list: [
			{ liClass: "", alinkClass: "", divClass: "", innerDom: null, selected: false }
		],
		selectEnd: function (i, n) {

		}
	}

	that.options = $.extend(true, {}, that.defaultOptions, options);

	that.$html = $('<ul class="u-tab"></ul>');

	$.each(that.options.list, function (i, n) {
		var $li = $('<li><a><div class="icon-x16"></div></a></li>');
		var $a = $li.find("a");
		var $div = $li.find("div");
		$li.addClass(n.liClass);
		$a.addClass(n.alinkClass);
		$div.addClass(n.divClass);
		n.innerDom && $li.prepend(n.innerDom);
		that.$html.append($li);
	});

	$("li", that.$html).on("click", function (e) {
		e.stopPropagation();
		var $this = $(this);
		var idx = $("li", that.$html).index($this);
		that.options.selectEnd(idx, that.options.list[idx]);
		if(that.options.enable){
			if(that.options.single){
				$("li", that.$html).removeClass("selected");
				$this.addClass("selected");
			}else{
				$this.toggleClass("selected");
			}
		}
	});
}

mainModule.directive("confSingletext", ['$rootScope', '$compile', 'pageService', 'editorService',
    function ($rootScope, $compile, pageService, editorService) {
    return {
        restrict: "A",
        template: [
    		'<section class="c-conf-section z-expand" style="display: block;">',
    			'<section class="u-conf-section c-singletext">',
	    			'<div class="c-conf-row"><textarea placeholder="亲，在这里输入文本哦" ng-model="currentComponent.options.text"></textarea></div>',
	    			'<div class="c-conf-row c-conf-row-1"></div>',
	    			'<div class="c-conf-row c-conf-row-2">',
				        '<div class="c-input-box box-lf"></div>', 
				        '<div class="c-input-box box-rf"></div>',
				    '</div>',
	    		'</section>',
    		'</section>'
    	].join(''),
        replace: true,
        link: function (scope, element, attrs) {
        	var confFontSize = new ConfFontSize();
	    	var confTextAlign = new ConfTextAlign();
	    	var confLineHeight = new ConfLineHeight();
	    	var uTab = new UTab({
	    		list: [
	    			{ liClass: "dropdown font-size", alinkClass: "small", divClass: "icon-x16 x-icon-font-size" },
	    			{ liClass: "font-size", alinkClass: "small", divClass: "icon-x16 x-icon-font-color" },
	    			{ liClass: "dropdown text-align", alinkClass: "small", divClass: "icon-x16 x-icon-center" },
	    			{ liClass: "dropdown line-height", alinkClass: "small", divClass: "icon-x16 x-icon-line-height" }
	    		],
	    		selectEnd: function (i, n) {
	    			console.log(i, n);
				}
	    	});

	    	$(".c-conf-row.c-conf-row-1", that.$conf).append(uTab.$html);
	    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confFontSize.$html);
	    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confTextAlign.$html);
	    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confLineHeight.$html);

	    	$(".dropdown.font-size", that.$conf).on("click", function (e) {
	    		$(".dropdown-list").hide();
	    		confFontSize.$html.show();
	    	});

	    	$(".dropdown.text-align", that.$conf).on("click", function (e) {
	    		$(".dropdown-list").hide();
	    		confTextAlign.$html.show();
	    	});

	    	$(".dropdown.line-height", that.$conf).on("click", function (e) {
	    		$(".dropdown-list").hide();
	    		confLineHeight.$html.show();
	    	});
       	}
    }
}]);
var Singletext = ExClass(H5ComponentBase, {
    initialize: function($super, options) { 
    	var that = this;
        
        that.defaultOptions = {
        	type: "singletext",
        	left: 112,
        	top: 108,
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

		that.componentTemplate = '<div inside-styles="" class="text-wrap"></div>';
		that.innerTemplate = '<div class="text-content"></div>';
		that.configTemplate = '<div config-position></div>';

		that.$component = $(that.componentTemplate);
		that.$inner = $(that.innerTemplate);
		//that.$config = $(that.configTemplate);
		that.options = $.extend(true, {}, that.defaultOptions, options);

		$super(that.options);
		//$.extend(that, that.options);
		that.$container.addClass("c-single-text");
		
		//that.$config = $('<div config-common></div>');
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
	    			'<div class="c-conf-row"><textarea placeholder="亲，在这里输入文本哦" ng-model="currentComponent.text"></textarea></div>',
	    			'<div class="c-conf-row c-conf-row-1"></div>',
	    			'<div class="c-conf-row c-conf-row-2">',
				        '<div class="c-input-box box-lf"></div>', 
				        '<div class="c-input-box box-rf"></div>',
				    '</div>',
	    		'</section>',
    		'</section>',
    		'<div config-common></div></section>'
    	].join('');

    	// var confTabSection = [
    	// 	'<div config-common></div>',
    	// 	'<section class="c-conf-section c-conf-tabSection">',
     //            '<ul class="u-tab z-singleLine">',
     //                '<li><a href="javascript:void(0);" style="border-left:none;" class="z-active">样式</a></li>',
     //                '<li><a href="javascript:void(0);">动画</a></li>',
     //            '</ul>',
     //        '</section>',
    	// ].join('');

    	// var confAnimation = new ConfAnimation({});
    	that.$conf = $(confTemplate);
  //   	that.$confTabSection = $(confTabSection);
  //   	that.$confStyle = $(that.confFacadeTemplate);
		// that.$confAnimation = confAnimation.$html;
		// that.$confPosition = $(that.confPositionTemplate);

  //   	that._initRow1();
  //   	that._initRow2();

  //   	var tpl = [
  //   		that.confHeaderTemplate,
  //   		that.confSettingTemplate,
  //   		that.confFacadeTemplate,
  //   		that.confAnimationTemplate,
  //   		that.confPositionTemplate
  //   	].join('');

    	that.$config = $('<section class="c-config-wapper"></section>');
    	//that.$config.append($(that.confHeaderTemplate));
    	that.$config.append(that.$conf);
    	// that.$config.append(that.$confTabSection);
    	// that.$config.append(that.$confStyle);
    	// that.$config.append(that.$confAnimation);
    	// that.$config.append(that.$confPosition);

    	// that.$confStyle.show();
    	// that.$confAnimation.hide();

    	// $("ul li", that.$confTabSection).on("click", function (e) {
    	// 	e.stopPropagation();
    	// 	var $this = this;
    	// 	$("ul li>a", that.$confTabSection).removeClass("z-active");
    	// 	$("a", $this).addClass("z-active");
    	// 	var idx = $("ul li", that.$confTabSection).index($this);
    	// 	switch(idx){
    	// 		case 0: that.$confStyle.show(); that.$confAnimation.hide(); break;
    	// 		case 1: that.$confStyle.hide(); that.$confAnimation.show(); break;
    	// 	}
    	// });

    	// that.$bgColor = $([
    	// 	'<div class="u-colorpicker">',
     //            '<input type="text" style="color: rgb(0, 0, 0); background: rgb(225, 225, 225);">',
     //            '<a href="javascript:void(0);" class="small"><i class="icon-x20 icon-x20-color"></i></a>',
     //        '</div>'
    	// ].join(''));

    	// that.$borderWidth = $([
    	// 	'<div class="u-colorpicker f-ml-6">',
     //            '<input type="text" style="color: rgb(0, 0, 0); background: rgb(225, 225, 225);">',
     //            '<a href="javascript:void(0);" class="small"><i class="icon-x20 icon-x20-color"></i></a>',
     //        '</div>'
    	// ].join(''));

    	// that.$bgColor.colorpicker({
    	// 	onChange: function(color){
    	// 		console.log(color);
    	// 	}
     //    });

     //    that.$borderWidth.colorpicker({
    	// 	onChange: function(color){
    	// 		console.log(color);
    	// 	}
     //    });

     //    function onChange(data) {
     //    	console.log(data);
     //    }
     //    var spinner = new Spinner();
     //    var borderRadiusSlider = new Slider({ val: 0, min: 0, max: 50, step: 1, onChange: onChange });
     //    var opacitySlider = new Slider({ val: 0, min: 0, max: 100, step: 1, onChange: onChange });
     //    var rotateSlider = new Slider({ val: 0, min: 0, max: 360, step: 1, onChange: onChange });

     //    $("div.c-conf-panel:eq(0)>div.c-conf-row>div.c-input-box", that.$confStyle).append(that.$bgColor);
     //    $("div.c-conf-panel:eq(1)>div.c-conf-row>div.c-input-box", that.$confStyle).append(spinner.$html);
     //    $("div.c-conf-panel:eq(1)>div.c-conf-row>div.c-input-box", that.$confStyle).append(that.$borderWidth);
     //    $("div.c-conf-panel:eq(2)>div.c-conf-row>div.c-input-box", that.$confStyle).replaceWith(borderRadiusSlider.$html);
     //    $("div.c-conf-panel:eq(3)>div.c-conf-row>div.c-input-box", that.$confStyle).replaceWith(opacitySlider.$html);
     //    $("div.c-conf-panel:eq(4)>div.c-conf-row>div.c-input-box", that.$confStyle).replaceWith(rotateSlider.$html);
    },
    _initConfig: function () {
    	var that = this;
    },
    _initRow1: function () {
    	var that = this;
    	var confFontSize = new ConfFontSize();
    	var confTextAlign = new ConfTextAlign();
    	var confLineHeight = new ConfLineHeight();
    	var uTab = new UTab({
    		list: [
    			{ liClass: "dropdown font-size", alinkClass: "small", divClass: "icon-x16 x-icon-font-size" },
    			{ liClass: "font-size", alinkClass: "small", divClass: "icon-x16 x-icon-font-color" },
    			{ liClass: "dropdown text-align", alinkClass: "small", divClass: "icon-x16 x-icon-center" },
    			{ liClass: "dropdown line-height", alinkClass: "small", divClass: "icon-x16 x-icon-line-height" }
    		],
    		selectEnd: function (i, n) {
    			console.log(i, n);
			}
    	});
    	$(".c-conf-row.c-conf-row-1", that.$conf).append(uTab.$html);
    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confFontSize.$html);
    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confTextAlign.$html);
    	$(".c-conf-row.c-conf-row-1", that.$conf).append(confLineHeight.$html);

    	$(".dropdown.font-size", that.$conf).on("click", function (e) {
    		$(".dropdown-list").hide();
    		confFontSize.$html.show();
    	});

    	$(".dropdown.text-align", that.$conf).on("click", function (e) {
    		$(".dropdown-list").hide();
    		confTextAlign.$html.show();
    	});

    	$(".dropdown.line-height", that.$conf).on("click", function (e) {
    		$(".dropdown-list").hide();
    		confLineHeight.$html.show();
    	});
    },
    _initRow2: function () {
    	var that = this;

    	var confFontFamily = new ConfFontFamily();
    	var uTab1 = new UTab({
    		list: [
    			{ liClass: "dropdown font-face", alinkClass: "small", divClass: "icon-x16 x-icon-display x-icon-SimHei" }
    		],
    		selectEnd: function (i, n) {
    			console.log(i, n);
			}
    	});

    	var uTab2 = new UTab({
    		enable: true,
    		list: [
    			{ liClass: "", alinkClass: "small", divClass: "icon-x16 x-icon-b" },
    			{ liClass: "", alinkClass: "small", divClass: "icon-x16 x-icon-i" },
    			{ liClass: "", alinkClass: "small", divClass: "icon-x16 x-icon-u" }
    		],
    		selectEnd: function (i, n) {
    			console.log(i, n);
			}
    	});

    	$(".c-conf-row.c-conf-row-2>div:eq(0)", that.$conf).append(uTab1.$html);
    	$(".c-conf-row.c-conf-row-2>div:eq(0)", that.$conf).append(confFontFamily.$html);
    	$(".c-conf-row.c-conf-row-2>div:eq(1)", that.$conf).append(uTab2.$html);

    	$(".dropdown.font-face", that.$conf).on("click", function (e) {
    		$(".dropdown-list").hide();
    		confFontFamily.$html.show()
    	});
    }
});