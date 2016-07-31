var constants = {
	navigationArea: {
		toolBottons: [{
			type: "singleimage",
			icon: "/tpls/components/singleimage/images/icon-s.png",
			title: "点击添加",
			text: "图片"
		}, {
			type: "singletext",
			icon: "/tpls/components/singletext/images/icon-s.png",
			title: "点击添加",
			text: "文本"
		}, {
			type: "externallinks",
			icon: "/tpls/components/externallinks/images/icon-s.png",
			title: "",
			text: "按钮",
			list: [{ type:"address", text:"链接" }, { type:"phone", text:"拨打电话" }, { type:"layer", text:"弹出层" }, { type:"link", text:"跳转页面" }]
		}]
	},
	componentsArea: {
		components: [{
			isNeedVip: false,
			isNew: false,
			name: "表单",
			icon: "http://staticeng.liveapp.cn/tpl/components/form/customform/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "地图",
			icon: "http://staticeng.liveapp.cn/tpl/components/map/singlemap/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "视频",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/video/singlevideo/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "音频",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/audio/singleaudio/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "画册",
			icon: "http://staticeng.liveapp.cn/tpl/components/image/multiimage/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "互动",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/interactive/like/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "抽奖",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/interactive/lottery/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: false,
			isNew: false,
			name: "照片墙",
			icon: "http://staticeng.liveapp.cn/tpl/components/image/photowall/icon.png",
			tip: "点击或拖拽添加"
		},{
			isNeedVip: true,
			isNew: false,
			name: "卡券",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/ticket/icon.png",
			tip: "请升级到vip以使用组件"
		},{
			isNeedVip: true,
			isNew: false,
			name: "语音留言墙",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/audiowall/singleaudiowall/icon.png",
			tip: "请升级到vip以使用组件"
		},{
			isNeedVip: true,
			isNew: true,
			name: "支付",
			icon: "http://staticeng.liveapp.cn/tpl/components/business/payment/singlepay/icon.png",
			tip: "请升级到vip以使用组件"
		}]
	},
	previewArea: {},
	editorArea: {},
	configArea: {
		slideAnimOptions: [
		]
	},
}

constants.pageIconList = [
    { "name": "LiveApp", "value": "0", "icon": "slide-page-icon-default" },
    { "name": "UpArrow", "value": "1", "icon": "slide-page-icon-up" },
    { "name": "DownArrow", "value": "2", "icon": "slide-page-icon-down" }
];

constants.pageAnimationList = [
    { "type": "anime-page-slideZoomIn", "name": "缩放", "effect": "a_slideZoom_bottomIn", "duration": 0.5, "delay": 0 },
    { "type": "anime-page-slideIn", "name": "滑动", "effect": "a_slide_bottomIn", "duration": 0.5, "delay": 0 },
    { "type": "anime-page-fadeIn", "name": "淡入", "effect": "a_fadeIn_bottomIn", "duration": 0.5, "delay": 0 },
    { "type": "anime-page-rotateIn", "name": "旋入", "effect": "a_rotate_bottomIn", "duration": 0.5, "delay": 0 },
    { "type": "anime-page-xSlideIn", "name": "横向滑动", "effect": "a_xSlide_rightIn", "duration": 0.5, "delay": 0 }
];

constants.comsAnimationList = [
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
    { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从上旋入", "effect": "rotateInDownLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从下旋入", "effect": "rotateInUpLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从左旋入", "effect": "rotateInDownRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateIn", "direction": "in", "typeName": "旋入", "name": "从右旋入", "effect": "rotateInUpRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
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
    { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从上旋出", "effect": "rotateOutDownLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从下旋出", "effect": "rotateOutUpLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从左旋出", "effect": "rotateOutDownRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"rotateOut", "direction": "out", "typeName": "旋出", "name": "从右旋出", "effect": "rotateOutUpRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "渐进缩小", "effect": "zoomOut", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
    { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从上缩小", "effect": "zoomOutDown", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从下缩小", "effect": "zoomOutUp", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从左缩小", "effect": "zoomOutLeft", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"zoomOut", "direction": "out", "typeName": "渐进缩小", "name": "从右缩小", "effect": "zoomOutRight", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": false },
    { "type":"hinge", "direction": "out", "typeName": "坠落", "name": "坠落", "effect": "hinge", "delay": 0, "duration": 1, "count": 1,"infinite":false, "default": true },
];

constants.scale = 1;

