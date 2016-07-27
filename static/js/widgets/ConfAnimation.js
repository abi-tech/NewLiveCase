var PanelAnimation = function (options) {
	var that = this;

	var defaultOptions = {
		type: "in",
		label: "没有出场动画", //没有入场动画
		animations: [
			{ "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从上弹入", "effect": "bounceInDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从下弹入", "effect": "bounceInUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从左弹入", "effect": "bounceInLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从右弹入", "effect": "bounceInRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeIn", "direction": "in", "typeName": "淡入", "name": "淡入", "effect": "fadeIn", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"fadeIn", "direction": "in", "typeName": "淡入", "name": "从上淡入", "effect": "fadeInDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeIn", "direction": "in", "typeName": "淡入", "name": "从下淡入", "effect": "fadeInUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeIn", "direction": "in", "typeName": "淡入", "name": "从左淡入", "effect": "fadeInLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeIn", "direction": "in", "typeName": "淡入", "name": "从右淡入", "effect": "fadeInRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"flipIn", "direction": "in", "typeName": "翻入", "name": "水平翻入", "effect": "flipInY", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
		    { "type":"flipIn", "direction": "in", "typeName": "翻入", "name": "垂直翻入", "effect": "flipInX", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
		    { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "旋入", "effect": "rotateIn", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从上旋入", "effect": "rotateInDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从下旋入", "effect": "rotateInUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从左旋入", "effect": "rotateInLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从右旋入", "effect": "rotateInRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomIn", "direction": "in", "typeName": "渐进放大", "name": "渐进放大", "effect": "zoomIn", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"zoomIn", "direction": "in", "typeName": "渐进放大", "name": "从上放大", "effect": "zoomInDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomIn", "direction": "in", "typeName": "渐进放大", "name": "从下放大", "effect": "zoomInUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomIn", "direction": "in", "typeName": "渐进放大", "name": "从左放大", "effect": "zoomInLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomIn", "direction": "in", "typeName": "渐进放大", "name": "从右放大", "effect": "zoomInRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceOut", "direction": "out", "typeName": "弹出", "name": "弹出", "effect": "bounceOut", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"bounceOut", "direction": "out", "typeName": "弹出", "name": "从上弹出", "effect": "bounceOutDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceOut", "direction": "out", "typeName": "弹出", "name": "从下弹出", "effect": "bounceOutUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceOut", "direction": "out", "typeName": "弹出", "name": "从左弹出", "effect": "bounceOutLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"bounceOut", "direction": "out", "typeName": "弹出", "name": "从右弹出", "effect": "bounceOutRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeOut", "direction": "out", "typeName": "淡出", "name": "淡出", "effect": "fadeOut", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"fadeOut", "direction": "out", "typeName": "淡出", "name": "从上淡出", "effect": "fadeOutDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeOut", "direction": "out", "typeName": "淡出", "name": "从下淡出", "effect": "fadeOutUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeOut", "direction": "out", "typeName": "淡出", "name": "从左淡出", "effect": "fadeOutLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"fadeOut", "direction": "out", "typeName": "淡出", "name": "从右淡出", "effect": "fadeOutRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"flipOut", "direction": "out", "typeName": "翻出", "name": "水平翻出", "effect": "flipOutY", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
		    { "type":"flipOut", "direction": "out", "typeName": "翻出", "name": "垂直翻出", "effect": "flipOutX", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
		    { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "旋出", "effect": "rotateOut", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从上旋出", "effect": "rotateOutDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从下旋出", "effect": "rotateOutUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从左旋出", "effect": "rotateOutLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从右旋出", "effect": "rotateOutRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "渐进缩小", "effect": "zoomOut", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
	        { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从上缩小", "effect": "zoomOutDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从下缩小", "effect": "zoomOutUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从左缩小", "effect": "zoomOutLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从右缩小", "effect": "zoomOutRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
	        { "type":"hinge", "direction": "out", "typeName": "坠落", "name": "坠落", "effect": "hinge", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
		],
		onChosenEnd: function (animation) { }
	};

	that.options = $.extend(true, {}, defaultOptions, options);
	//anime-flipOut undefined
	var tpl_wrapper = [
	'<div class="c-conf-panel" style="display: block;">',
		'<div class="c-conf-row c-conf-row-2">',
	        '<a href="javascript:void(0);" class="link-chooseAnime">',
	            '<div class="u-image-wrap"><div class="u-image-large undefined"></div></div>',
	        '</a>',
	        '<div class="c-input-box c-conf-col-22 f-pb-4"></div>',
	    '</div>',
	    '<div class="c-conf-panel f-mt-4" style="display: none;">',
	        '<hr class="u-hr u-hr-2" />',
	        '<div class="c-conf-row c-conf-row-3"></div>',
	        '<div class="c-conf-row"><label class="c-input-label">开始时间</label><div class="c-input-box"></div></div>',
	        '<div class="c-conf-row"><label class="c-input-label">持续时间</label><div class="c-input-box"></div></div>',
	        '<div class="c-conf-row"><label class="c-input-label">执行次数</label><div class="c-input-box"></div></div>',
	        '<div class="c-conf-row"><label class="c-input-label">无限循环</label><div class="c-input-box"></div></div>',
	    '</div>',
	'</div>'
	].join('');

	var tpl_none_anim = [
	'<div class="f-mt-4" style="display: block;">',
        '<label class="u-label f-float-l f-mt-4">' + that.options.label + '</label>',
        '<a href="javascript:void(0);" class="u-btn u-btn-large">添加动画</a>',
    '</div>'
	].join('');

	var tpl_hasa_anim = [
	'<div class="f-mt-8" style="display: none;">',
        '<label class="u-label f-float-l"></label>',
        '<a href="javascript:void(0);" class="icon-toggle f-mr-7 toggleAnime"></a>',
        '<a href="javascript:void(0);" class="icon-play f-mr-7"></a>',
        '<a href="javascript:void(0);" class="icon-x24 icon-x24-remove"></a>',
    '</div>'
	].join('');

	var tpl_dialog_anim = [
	'<div class="u-dialog" style="display: none; height: 230px;">',
        '<header class="u-dialog-head">选择动画</header>',
        '<section class="u-dialog-body"></section>',
    '</div>'
	].join('');

	that.filterAnimation = function (type) {
		return $.map(that.options.animations, function (n) {
			if(n.type == type) return n;
		});
	}

	var animTypeList = $.map(that.options.animations, function (n) {
		if(n.direction == that.options.type && n.default === true) 
			return { name: n.typeName, effect: n.type};
	});

	var chooseAnimType = new ChooseList({
		type: "normal",
		list: animTypeList,
		onChosenEnd: function (idx, data, item) {
			$("div.u-image-wrap>div", that.$chooseAnime).removeClass();
			$("div.u-image-wrap>div", that.$chooseAnime).addClass("u-image-large");
			$("div.u-image-wrap>div", that.$chooseAnime).addClass("anime-" + data.effect);
			$("label", that.$viewHasa).text(data.name);
			that.$viewDialog.hide();
			that.$viewNone.hide();
			that.$viewHasa.show();
			that.$panel.show();
			that.$row1.empty();
			var animations = that.filterAnimation(data.effect);
			var chooseAnimList = new ChooseList({
				type: "small",
				value: animations[0].effect,
				anim: true,
				list: animations,
				onChosenEnd: function (idx, data, item) {
					console.log(idx, data);
				}
			});
			that.$row1.append(chooseAnimList.$html);
		}
	});


	that.$viewNone = $(tpl_none_anim);
	that.$viewHasa = $(tpl_hasa_anim);
	that.$viewDialog = $(tpl_dialog_anim);
	that.$html = $(tpl_wrapper);
	that.$chooseAnime = $(".link-chooseAnime", that.$html);
	that.$panel = $("div.c-conf-panel", that.$html);
	that.$row1 = $("div.c-conf-row:eq(0)", that.$panel);
	that.$row2 = $("div.c-conf-row:eq(1)", that.$panel);
	that.$row3 = $("div.c-conf-row:eq(2)", that.$panel);
	that.$row4 = $("div.c-conf-row:eq(3)", that.$panel);
	that.$row5 = $("div.c-conf-row:eq(4)", that.$panel);

	$("section.u-dialog-body", that.$viewDialog).append(chooseAnimType.$html);

	$("div.c-input-box.f-pb-4", that.$html).append(that.$viewNone);
	$("div.c-input-box.f-pb-4", that.$html).append(that.$viewHasa);
	$("div.c-input-box.f-pb-4", that.$html).append(that.$viewDialog);


	that.calcDialogTop = function (argument) {
		var windowHeight = $("body").height();
		var dialogHeight = that.$viewDialog.outerHeight();
		var top = that.$chooseAnime.offset().top;
		console.log(windowHeight, dialogHeight, top);
		if(windowHeight <= top + dialogHeight){
			top = windowHeight - dialogHeight - 10;
		}
		that.$viewDialog.css("top", top);
	}

	that.reset = function () {
		chooseAnimType.unchoose();
		$("div.u-image-wrap>div", that.$chooseAnime).removeClass();
		$("div.u-image-wrap>div", that.$chooseAnime).addClass("u-image-large");
		$("div.u-image-wrap>div", that.$chooseAnime).addClass("undefined");
		that.$viewDialog.hide();
		that.$viewNone.show();
		that.$viewHasa.hide();
		that.$panel.hide();
	}
	//选择动画
	that.$chooseAnime.on("click", function (e) {
		e.stopPropagation();

		that.calcDialogTop();
		that.$viewDialog.toggle();
	});

	//添加动画
	$("a.u-btn", that.$viewNone).on("click", function (e) {
		e.stopPropagation();

		that.calcDialogTop();
		that.$viewDialog.toggle();
	});

	//更换
	$("a:eq(0)", that.$viewHasa).on("click", function (e) {
		e.stopPropagation();

		that.calcDialogTop();
		that.$viewDialog.toggle();
	});
	//预览
	$("a:eq(1)", that.$viewHasa).on("click", function (e) {
		e.stopPropagation();
	});
	//删除
	$("a:eq(2)", that.$viewHasa).on("click", function (e) {
		e.stopPropagation();
		that.reset();
	});


	$(window).on("resize", function (e) {
		that.calcDialogTop();
	});
}

var ConfAnimation = function (options) {
	var that = this;

	var defaultOptions = {};

	var template = [
	'<section class="c-conf-section c-conf-animeSection">',
		'<div class="c-conf-row"></div>',
	'</section>'
	].join('');

	var tpl_tab_anim_in_out = [
	'<ul class="u-tab z-singleLine f-mb-10">',
        '<li><a href="javascript:void(0);" class="z-active">入场动画</a></li>',
        '<li><a href="javascript:void(0);">出场动画</a></li>',
    '</ul>'
	].join('');

	$.extend(true, {}, defaultOptions, options);

	var animIn = new PanelAnimation({
		type: "in",
		label: "没有入场动画"
	});
	var animOut = new PanelAnimation({
		type: "out",
		label: "没有出场动画"
	});

	that.$html = $(template);
	that.$tabAnimInOut = $(tpl_tab_anim_in_out);
	that.$panelAnimIn = animIn.$html;
	that.$panelAnimOut = animOut.$html;

	that.$panelAnimIn.show();
	that.$panelAnimOut.hide();
	$("div.c-conf-row:eq(0)", that.$html).append(that.$tabAnimInOut);
	that.$html.append(animIn.$html);
	that.$html.append(animOut.$html);

	$("li:eq(0)", that.$tabAnimInOut).on("click", function (e) {
		e.stopPropagation();
		$("li a", that.$tabAnimInOut).removeClass("z-active");
		$("a", this).addClass("z-active");

		that.$panelAnimIn.show();
		that.$panelAnimOut.hide();
	});

	$("li:eq(1)", that.$tabAnimInOut).on("click", function (e) {
		e.stopPropagation();
		$("li a", that.$tabAnimInOut).removeClass("z-active");
		$("a", this).addClass("z-active");

		that.$panelAnimIn.hide();
		that.$panelAnimOut.show();
	});
}