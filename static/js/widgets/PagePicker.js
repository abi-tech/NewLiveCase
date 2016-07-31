;(function ($, window, document, undefined) {
	var defaultOptions, template, options, $html, $pageList, ulTab, $btnWrap, $btnConfirm, $btnCancel;

	defaultOptions = {
		data: null,
		list: [],
		onChosen: function (data){},
		onConfirm: function(data){}
	};

	template = [
	'<div class="g-addpage" style="display: block; left: -150%;">',
		'<section class="m-addPage" avalonctrl="addpage">',
			'<section class="m-pageList">',
				'<nav><ul></ul></nav>',
				'<div class="loading icon-x26 icon-x26-loading a-rotateZ"></div>',
				'<div class="add-page-btn-wrap">',
					'<div class="add-page-btn btn-confirm"></div>',
					'<div class="add-page-btn btn-cancel"></div>',
				'</div>',
			'</section>',
		'</section>',
	'</div>'
	].join('');

	var tpl_tabitem = '<li></li>';
	var tpl_tabpanel = '<div class="c-page-list-show" type="1" style="display: none;"></div>';
	var tpl_tabpanel_item = '<section class="c-page-container" title="" style="display: block;"></section>';

	var mockData = [
		{ "name": "封面", "type": "0", "list": [
			{ "title": "空白页", "url": "/tpls/tplpage/images/blank-page.png", "data": null },
			{ "title": "年夜饭封面", "url": "/tpls/tplpage/images/25d1f25cd954237e6a6091c508f7_14527656960705_56977.jpg", "data": {
				bgImage: { url: "/upload/image/a0d84cd1f08c117ed835de6c2a43_14522151520026_253108.jpg", width: 640, height: 1040 },
				components: [
					{
						type: "singleimage",
			            url: "/upload/image/268b8bd33fbd039ac754173b425e_14522153059123_253108.png",
			        	left: 265,
			        	top: 404,
			            width: 103,
			            height: 135,
			            zIndex:　10700,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 3.25, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/7bf3b3beaf72648a3b912a6ead4f_14522153128217_253108.png",
			        	left: 367,
			        	top: 412,
			            width: 119,
			            height: 121,
			            zIndex:　10800,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 3.5, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singletext",
			            text: "鸿瑞兴",
			            left: 115,
			        	top: 311,
			            width: 417,
			            height: 80,
			            fontSize: 60,
			            fontColor: "rgb(255, 242, 167)",
			            zIndex:　10900,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 2.75, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/fba0276e8f6508302b4cb7fd86b5_14522151770205_253108.png",
			        	left: 0,
			        	top: 0,
			            width: 205,
			            height: 331,
			            zIndex:　10100,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从上弹入", "effect": "bounceInDown", "delay": 0.5, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/8e6962c01da188a4db5c4d675adc_14522151685019_253108.png",
			        	left: 0,
			        	top: 0,
			            width: 640,
			            height: 76,
			            zIndex:　10200
					}, {
						type: "singleimage",
			            url: "/upload/image/af9c2e9f975dcaac6b31c9b00fd8_14522152000168_253108.png",
			        	left: 452,
			        	top: 39,
			            width: 79,
			            height: 234,
			            zIndex:　10300,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从上弹入", "effect": "bounceInDown", "delay": 0.75, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/af9c2e9f975dcaac6b31c9b00fd8_14522152000168_253108.png",
			        	left: 498,
			        	top: 82,
			            width: 79,
			            height: 234,
			            zIndex:　10300,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从上弹入", "effect": "bounceInDown", "delay": 1.25, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/af9c2e9f975dcaac6b31c9b00fd8_14522152000168_253108.png",
			        	left: 555,
			        	top: 20,
			            width: 85,
			            height: 234,
			            zIndex:　10400,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "从上弹入", "effect": "bounceInDown", "delay": 1, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/782bec5e7634bed8776e24c293ab_14522152848244_253108.png",
			        	left: 20,
			        	top: 175,
			            width: 604,
			            height: 604,
			            zIndex:　10500,
			            animateIn: { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "旋入", "effect": "rotateIn", "delay": 2.25, "duration": 1, "count": 1,"infinite":false, "default": false }
					}, {
						type: "singleimage",
			            url: "/upload/image/0f69e16026387e305037d1b7d86e_14522152937312_253108.png",
			        	left: 150,
			        	top: 387,
			            width: 123,
			            height: 267,
			            zIndex:　10600,
			            animateIn: { "type":"bounceIn", "direction": "in", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 3, "duration": 1, "count": 1,"infinite":false, "default": false }
					}
				]}
			},
			{ "title": "互联网年会封面", "url": "/tpls/tplpage/images/CoQ8n1ZuV1OAd0BwAABMMvSqoDI421.jpg", "data": null },
			{ "title": "科技风封面", "url": "/tpls/tplpage/images/CoQ8n1ZuVuiAe5EUAABCvtccOrw390.jpg", "data": null },
			{ "title": "互联网封面", "url": "/tpls/tplpage/images/CoQ8n1ZuVl2ALMaGAAAjd1AbYwE573.jpg", "data": null },
			{ "title": "美女封面", "url": "/tpls/tplpage/images/CoQ8n1ZlDbqAITQbAAB6rpT6znk978.jpg", "data": null }
		]},
		{ "name": "图文", "type": "1", "list": [
			{ "title": "空白页", "url": "/tpls/tplpage/images/blank-page.png", "data": null },
			{ "title": "互联网年会图文", "url": "/tpls/tplpage/images/CoQ8n1ZuV1CAcQHiAABW4ScPfno755.jpg", "data": null },
			{ "title": "嘉宾图文", "url": "/tpls/tplpage/images/CoQ8n1ZuVuyAIv1CAABWer-2aCU159.jpg", "data": null },
			{ "title": "互联网图文", "url": "/tpls/tplpage/images/CoQ8n1ZuVmGARSigAABu_AEKgG0364.jpg", "data": null },
			{ "title": "互联网图文2", "url": "/tpls/tplpage/images/CoQ8n1ZuVmWAZJmSAABmvm0hnD0835.jpg", "data": null },
			{ "title": "家居图文", "url": "/tpls/tplpage/images/CoQ8n1ZlDa-AebSaAABoQRZIKrg788.jpg", "data": null }
		]},
		{ "name": "功能", "type": "2", "list": [
			{ "title": "空白页", "url": "/tpls/tplpage/images/blank-page.png", "data": null },
			{ "title": "家居支付功能", "url": "/tpls/tplpage/images/CoQ8n1ZSooyAOpKaAAA96JdIk8A269.jpg", "data": null },
			{ "title": "相机支付功能", "url": "/tpls/tplpage/images/CoQ8n1ZSopaAJTdYAABGePhiwpw228.jpg", "data": null },
			{ "title": "女包支付功能", "url": "/tpls/tplpage/images/CoQ8n1ZSopGAJ6IoAABcXxr7OFQ955.jpg", "data": null },
			{ "title": "摇一摇卡券功能页", "url": "/tpls/tplpage/images/CoQ8n1ZSpICAcHnaAABDJrH2CgA524.jpg", "data": null },
			{ "title": "优惠券功能页", "url": "/tpls/tplpage/images/CoQ8n1ZSpHyASWk4AABgeQfGj_Y115.jpg", "data": null }
		]},
		{ "name": "尾页", "type": "3", "list": [
			{ "title": "空白页", "url": "/tpls/tplpage/images/blank-page.png", "data": null },
			{ "title": "场景尾页", "url": "/tpls/tplpage/images/CoQ8n1ZuVgyABpFZAABSo4nx5OM792.jpg", "data": null },
			{ "title": "圣诞运营尾页", "url": "/tpls/tplpage/images/CoQ8n1ZpL1OAY7_iAACKcQSyQZQ318.jpg", "data": null },
			{ "title": "场景页：尾页", "url": "/tpls/tplpage/images/CoQ8n1X6JM2AXSCuAABWzjsXs80977.jpg", "data": null },
			{ "title": "场景页：尾页", "url": "/tpls/tplpage/images/CoQ8n1X6JNiACkLLAABZG8z3jeA063.jpg", "data": null },
			{ "title": "新场景尾页", "url": "/tpls/tplpage/images/CoQ8n1ZJWgiASlldAABDHyV-Ul4891.jpg", "data": null }
		]},
		{ "name": "表单", "type": "4", "list": [
			{ "title": "空白页", "url": "/tpls/tplpage/images/blank-page.png", "data": null },
			{ "title": "沙龙问卷调查表单", "url": "/tpls/tplpage/images/CoQ8n1ZSprSAK9EqAAA9sVB_Pas830.jpg", "data": null },
			{ "title": "地图加表单功能", "url": "/tpls/tplpage/images/CoQ8n1ZSpsKAIuc2AABGxdwbsOQ228.jpg", "data": null },
			{ "title": "表单功能", "url": "/tpls/tplpage/images/CoQ8n1ZSpriAa5OBAAAvGtm0kDQ307.jpg", "data": null },
			{ "title": "场景页：功能", "url": "/tpls/tplpage/images/CoQ8n1X6JFOAXTdwAAAh34_Rcl8427.jpg", "data": null },
			{ "title": "场景页：功能", "url": "/tpls/tplpage/images/CoQ8n1X6JEmAXIfkAAAk1GMaY7I810.jpg", "data": null }
		]},
	];

	var PagePicker = function (opts) {
		var that = this;

		defaultOptions.list = mockData;

		options = $.extend(true, {}, defaultOptions, opts);
		$html = $(template);
		$pageList = $("section.m-pageList", $html);
		$ulTab = $("nav>ul", $pageList);
		$btnWrap = $(".add-page-btn-wrap", $pageList);
		$btnConfirm = $(".btn-confirm", $btnWrap);
		$btnCancel = $(".btn-cancel", $btnWrap);

		that._init();
	}

	PagePicker.prototype._init = function() {
		this._initView();
		this._initEvent();
	};

	PagePicker.prototype._initTab = function() {
		var that = this;
		$ulTab.empty();
		$(".c-page-list-show", $pageList).remove();
		var indecate = $('<div class="active-bar" style="left: calc(0%);"></div>');
		$.each(options.list, function (i, iNode) {
			var liTabItem = $(tpl_tabitem);
			var divTabPanel = $(tpl_tabpanel);

			liTabItem.attr("data-type", iNode.type);
			divTabPanel.attr("data-type", iNode.type);
			liTabItem.text(iNode.name);

			$ulTab.append(liTabItem);
			$pageList.append(divTabPanel);

			$.each(iNode.list, function (j, jNode) {
				var sectionTabPanelItem = $(tpl_tabpanel_item);

				sectionTabPanelItem.attr("title", jNode.title);
				sectionTabPanelItem.css("background-image", "url('" + jNode.url + "')");
				sectionTabPanelItem.data("page", jNode.data);
				divTabPanel.append(sectionTabPanelItem);

				sectionTabPanelItem.on("click", function (e) {
					var data = $(this).data("page");
					options.data = $.extend(true, {}, data);
					options.onChosen(data);
				});
			});
			
			liTabItem.on("click", function (e) {
				var type = $(this).data("type");
				var index = $ulTab.find("li").index(this);
				indecate.css("left", (index * 100) + "%");
				$pageList.find(".c-page-list-show").hide();
				$pageList.find("div[data-type='" + type + "']").show();
			});

			if (i == 0) { 
				liTabItem.addClass("active"); 
				liTabItem.append(indecate); 
				divTabPanel.show();
			}
		});
	};

	PagePicker.prototype._initView = function() {
		this._initTab();
		$("body").append($html);
	};

	PagePicker.prototype._initEvent = function() {
		var that = this;
		$btnConfirm.on("click", function (e) {
			e.stopPropagation();
			options.onConfirm(options.data);
			that.hide();
		});

		$btnCancel.on("click", function (e) {
			e.stopPropagation();
			that.hide();
		});
	};

	PagePicker.prototype.show = function () {
		$html.css("left", "0px");
	}

	PagePicker.prototype.hide = function () {
		$html.css("left", "-150%");
	}

	PagePicker.prototype.toggle = function (showOrHide) {
		if (showOrHide) this.show();
		else this.show();
	}

	window.PagePicker = PagePicker;
})(jQuery, window, document);

