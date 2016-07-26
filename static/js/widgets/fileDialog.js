var tpl_file_dialog = [
'<div style="display: block; z-index: 100001; height: auto; width: auto; top: 0px; overflow: auto; position: static;">',
	'<section id="fileDialog" class="oni-dialog">',
		'<div class="oni-dialog-inner u-dialog-height" style="height: 600px;">',
			'<div class="oni-dialog-header u-dialog-header">',
				'<div class="oni-dialog-close"> <i class="oni-icon oni-icon-times icon-x18 icon-x18-dialog-close"></i></div>',
				'<div class="oni-dialog-title title">&nbsp;</div>',
			'</div>',
			'<div class="oni-dialog-content u-dialog-content u-dialog-mag-top" style="height: 384px;">',
				'<div id="dropzone" class="u-newdz">',
					'<div class="dz-default dz-message" style="opacity: 1!important;">',
						'<div class="u-upload-btn">上传文件</div>',
						'<p class="u-upload-txt">仅支持小于1M的JPG、JEPG、PNG、GIF、BMP格式图片</p>',
					'</div>',
					'<form class="dropzone dz-clickable" id="newDropzoneUpload">',
						'<div class="dz-default dz-message">',
							'<span>Drop files here to upload</span>',
						'</div>',
					'</form>',
					'<div class="cover" style="display: none;"></div>',
				'</div>',
				'<div class="f-fix uploadContent" style="height:460px;position: relative">',
					'<div class="previewCtrl"></div>',
					'<div class="imagePreview">',
						'<div class="typebra none"><ul></ul></div>',
					'</div>',
					'<div class="u-delete">',
						'<span>批量删除</span>',
					'</div>',
				'</div>',
			'</div>',
			'<div class="oni-dialog-footer oni-helper-clearfix u-dialog-footer">',
				'<div class="oni-dialog-btns u-dialog-btn-pos-important">',
					'<button id="btnOk" class="u-btn-mid-important oni-button oni-widget oni-state-default oni-corner-all oni-button-success u-btn-disabled">',
						'<span class="oni-button-text">确定</span>',
					'</button>',
					'<button id="btnCancel" class="u-btn-mid-light-grey-important oni-button oni-widget oni-state-default oni-corner-all">',
						'<span class="oni-button-text">取消</span>',
					'</button>',
				'</div>',
			'</div>',
		'</div>',
	'</section>',
'</div>'
].join('');

var FileDialog = function (options) {
	var that = this;
	var defaultOptions = {
		type: "image",           //image music
		css: {
			"position": "fixed",
			"width": "866px",
			"display": "none",
			"z-index": "100010",
			"left": "55.5px",
			"top": "31px"
		},
		maskCss: {
			"display": "none",
			"z-index": "100001",
			"height": "auto",
			"width": "auto",
			"top": "0px",
			"position": "fixed"
		},
		categories: [],
		fileList: [],
		chosen: null,
		onChosenEnd: function (item) { }
	};

	that.mask = '<div class="oni-dialog-layout u-dialog-layout" style=""></div>'
	that.template = tpl_file_dialog;
	that.options = $.extend(true, {}, defaultOptions, options);
	that.init();
}

FileDialog.prototype.init = function () {
	var that = this;
	var tpl_header_image = [
		'<div class="imagePreviewContent"><div class="img-noData">没有更多素材了</div></div>',
	].join('');

	var tpl_header_music = [
		'<div class="audiocontrol active first">',
			'<div class="name"><p class="gray" style="margin-left:60px;">名称</p></div>',
			'<div class="size"><p class="gray">大小</p></div>',
			'<div class="control"><p class="gray">操作</p></div>',
		'</div>',
	].join('');

	var tpl_body_image = '<div class="imagePreviewContent nonebra"><div class="img-noData">没有更多素材了</div></div>';

	var tpl_body_music = '<ul class="audioContent"></ul>';

	that.$mask = $(that.mask);
	that.$html = $(that.template);
	that.$dialog = that.$html.find("#fileDialog");

	that.$previewCtrl = $(".previewCtrl", that.$html);
	that.$filePreview = $(".imagePreview", that.$html);
	that.$uDelete = $(".u-delete", that.$html);
	that.$btnOk = $("#btnOk", that.$html);
	that.$btnCancel = $("#btnCancel", that.$html);
	that.$typebra = $(".imagePreview>div.typebra", that.$html);
	that.$header = $(that.options.type === 'image'? tpl_header_image : tpl_header_music);
	that.$content = $(that.options.type === 'image'? tpl_body_image : tpl_body_music);

	that.initData();
	that.initView();
	that.initEvent();
	$("body").append(that.$mask);
	$("body").append(that.$html);
}

FileDialog.prototype.initData = function () {
	var that = this;
	$.ajax({
		async: false,
		type: "GET",
		contentType: "application/json",
		url: "/static/data/" + that.options.type + ".json",
		success: function(data){
			that.options.categories.length = 0;
			$.merge(that.options.categories, data.categories);
		}
	});
}

FileDialog.prototype.initView = function () {
	var that = this;
	for(var key in that.options.css){
		$("#fileDialog", that.$html).css(key, that.options.css[key])
	}

	for(var key in that.options.maskCss){
		that.$mask.css(key, that.options.maskCss[key])
	}

	that.$previewCtrl.empty();
	var $ul = $("<ul>"); 
	for (var i = 0; i < that.options.categories.length; i++) {
		var cate = that.options.categories[i];
		var $li = $("<li>");
		$ul.append($li);
		$li.text(cate.name);
		$li.attr("data-id", cate.id);

		if(i == 0) $li.addClass("on");
	}
	that.$previewCtrl.append($ul);

	if(that.options.type === "image"){
		that.$filePreview.append(that.$content);
	}else{
		var wrapper = $('<div class="audio imagePreviewContent nonebra">');
		wrapper.append(that.$content);
		that.$filePreview.append(that.$header);
		that.$filePreview.append(wrapper);
	}
	that.$filePreview.append('<div class="previewFooterBg"></div>');
	that.dockCenter();
}

FileDialog.prototype.initEvent = function () {
	var that = this;

	that.$mask.on("click", function (e) {
		that.hide();
	});

	that.$uDelete.on("click", function (e) {
		alert("delete choosen");
	});

	that.$btnOk.on("click", function (e) {
		that.options.onChosenEnd && that.options.onChosenEnd(that.options.chosen);
		that.hide();
	});

	that.$btnCancel.on("click", function (e) {
		that.hide();
	});

	$("ul>li", that.$previewCtrl).on("click", function (e) {
		var index = $("ul>li", that.$previewCtrl).index(this);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		var id = $(this).attr("data-id");
		if(id == "0") that.$uDelete.show();
		else that.$uDelete.hide();

		var tpl_empty = '';
		var tpl_data = '<div class="typebra"><ul></ul></div>';

		that._destroyFiles();
		if(index >= 0){
			that.renderTypebra(that.options.categories[index]);
			that.renderContent(that.options.categories[index].children[0]);
		}
	});

	$(window).on("resize", function (e) {
		that.dockCenter();
	});
}

FileDialog.prototype._destroyFiles = function () {
	var that = this;
	$.each(that.options.fileList, function (i, n) {
		if(n.options.playing)
			n.pause();
	});
	that.options.fileList.length = 0;
}

FileDialog.prototype.renderTypebra = function (data) {
	var that = this;
	that.$typebra.empty();

	var $ul = $("<ul>");
	for (var i = 0; i < data.children.length; i++) {
		var item = data.children[i];
		var $li = $("<li>");
		$li.text(item.name);
		$ul.append($li);

		if(i == 0) $li.addClass("active");
	}

	if(data.children.length == 0) {
		that.$typebra.addClass("none");
		that.$content.addClass("nonebra");
	}
	else{
		that.$typebra.removeClass("none");
		if(that.options.type === 'image')
			that.$content.removeClass("nonebra");
		else if(that.options.type === 'music')
			that.$content.parent().removeClass("nonebra");
	}

	that.$typebra.append($ul);

	$("li", $ul).on("click", function (e) {
		var index = $("li", $ul).index(this);
		$(this).siblings().removeClass("active");
		$(this).addClass("active");

		that._destroyFiles();
		that.renderContent(data.children[index]);
	});
}

FileDialog.prototype.renderContent = function (data) {
	var that = this;
	that.$content.empty();
	var $empty = $('<div class="img-noData">没有更多素材了</div>');
	if(data){
		var url = "/static/data/" + that.options.type + "_pid_" + data.pid + "_id_" + data.id + ".json";
		$.ajax({
			async: false,
			type: "GET",
			contentType: "application/json",
			url: url,
			success: function(data){
				for (var i = 0; i < data.data.list.length; i++) {
					var obj = data.data.list[i];
					obj.type = that.options.type;
					obj.url = "/upload/" + that.options.type + "/"　+ obj.url;
					obj.onChecked = function(item) {
						$.each(that.options.fileList, function (i, n) {
							if(n.options.check && item != n)
								n.uncheck();
						});
						that.options.chosen = item;
					}
					obj.onPlay = function(item) {
						$.each(that.options.fileList, function (i, n) {
							if(n.options.playing && item != n)
								n.pause();
						});
					}

					var file = new File(obj);
					that.$content.append(file.$html);
					that.options.fileList.push(file);
				}
			}
		});
	}

	if(that.options.type === "image")
		that.$content.append($empty);
}

FileDialog.prototype.show = function () {
	var that = this;
	that.$mask.show();
	that.$html.show();
	that.$dialog.show();
	that.$dialog.addClass("active");
}

FileDialog.prototype.hide = function () {
	var that = this;
	that._destroyFiles();
	that.$mask.remove();
	that.$html.remove();
}

FileDialog.prototype.dockCenter = function () {
	var that = this;
	var winWidth = $(window).width();
	var dlgWidth = 866;
	var left = (winWidth - dlgWidth) / 2;
	that.$dialog.css("left", left);
}

FileDialog.prototype.getOptions = function () {
	return null;
}

FileDialog.prototype.setOptions = function (options) {

}
//======================================================================================================
var File = function(options){
	var that = this;
	var defaultOptions = { 
		type: "image", //image music
		name: "", 
		url: "",
		size: "",
		width: 0,
		height: 0,
		check: false,
		playing: false,
		canDelete: false,
		onChecked: function(item){},
		onPlay: function(item){}
	};

	var imageTemplate = [
	'<div class="imgPreview">',
		'<div class="dz-details" title="{{ name }}">',
			'<div class="previewImg" style="background-image: url(&quot;{{ url }}&quot;);"></div>',
			'<div class="delbtn"></div>',
		'</div>',
		'<p class="previewname" title="{{ name }}">{{ name }}</p>',
	'</div>'
	].join('');

	var musicTemplate = [
	'<li class="audiocontrol">',
		'<div class="name"><div class="nochoose"></div><p class="nametxt">{{ name }}</p></div>',
		'<div class="size"><p>{{ size }}</p></div>',
		'<div class="control"><div class="icon-x24 icon-x24-play"></div>',
	'</li>'
	].join('');

	that.options = $.extend({}, defaultOptions, options);
	that.template = that.options.type === "image"? imageTemplate : musicTemplate;
	that.init();
}

File.prototype.init = function () {
	var that = this;
	var html = template.compile(that.template)(that.options);
	that.image = new Image;
	that.audio = new Audio; 
	that.$html = $(html);
	that.$btn0 = $("div.control>div:eq(0)", that.$html);
	
	if(that.options.type === "image" && that.options.canDelete){
		that.$html.append('<div class="close"></div>');
	}else if(that.options.type === "music" && that.options.canDelete){
		$(".control", that.$html).append('</div><div class="icon-x24 icon-x24-resdelete"></div>');
	}

	if(that.options.type === "image")
		that.calc();

	that.initEvent();
}

File.prototype.initEvent = function () {
	var that = this;
	that.$html.on("click", function(e) {
		e.stopPropagation();

		that.options.onChecked && that.options.onChecked(that);
		that.options.check = !that.options.check;
		if(that.options.check){
			that.check();
		}else{
			that.uncheck();
		}
	});

	$("div.close", that.$html).on("click", function (e) {
		e.stopPropagation();
		alert("do delete!");
	});

	$("div.control>div:eq(0)", that.$html).on("click", function (e) {
		e.stopPropagation();

		that.options.onPlay && that.options.onPlay(that);
		that.options.playing = !that.options.playing;
		if(that.options.playing){
			that.play();
		}else{
			that.pause();
		}
	});
}

File.prototype.check = function () {
	var that = this;
	if(that.options.type === "image"){
		$(".dz-details>div.check", that.$html).remove();
		$(".dz-details", that.$html).append('<div class="check"></div>');
	}else if(that.options.type === "music"){
		$(".choose", that.$html).remove();
		$(".nametxt", that.$html).prepend('<div class="choose"></div>');
	}
	that.options.check = true;
}

File.prototype.uncheck = function () {
	var that = this;
	if(that.options.type === "image"){
		$(".dz-details>div.check", that.$html).remove();
	}else if(that.options.type === "music"){
		$(".choose", that.$html).remove();
	}
	that.options.check = false;
}

File.prototype.calc = function () {
	var that = this;
	that.image.onload = function(){        
		that.options.width = that.image.width;
		that.options.height = that.image.height;
	};
	that.image.src = that.options.url; 
}

File.prototype.play = function () {
	var that = this;
	that.audio.loop = true;
	that.audio.src = that.options.url; 
	that.audio.play();
	that.$btn0.removeClass("icon-x24-pause");
	that.$btn0.removeClass("icon-x24-play");
	that.$btn0.addClass("icon-x24-pause");
	that.options.playing = true;
}

File.prototype.pause = function () {
	var that = this;
	that.audio.pause();
	that.$btn0.removeClass("icon-x24-pause");
	that.$btn0.removeClass("icon-x24-play");
	that.$btn0.addClass("icon-x24-play");
	that.options.playing = false;
}



