var tpl_file_dialog = [
'<div style="display: block; z-index: 100001; height: auto; width: auto; top: 0px; overflow: auto; position: static;">',
	'<section id="fileDialog" class="oni-dialog active">',
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
						'<div class="imagePreviewContent nonebra"><div class="img-noData">没有更多素材了</div></div>',
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
		fileList: []
	};

	that.mask = '<div class="oni-dialog-layout u-dialog-layout" style=""></div>'
	that.template = tpl_file_dialog;
	that.options = $.extend({}, defaultOptions, options);
	that.init();
}

FileDialog.prototype.init = function () {
	var that = this;
	that.$mask = $(that.mask);
	that.$html = $(that.template);
	that.$previewCtrl = $(".previewCtrl", that.$html);
	that.$filePreview = $(".imagePreview", that.$html);
	that.$uDelete = $(".u-delete", that.$html);
	that.$btnOk = $("#btnOk", that.$html);
	that.$btnCancel = $("#btnCancel", that.$html);
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
		url: "/static/data/categories.json?v=1.0.0",
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

		if(index >= 0){
			that.renderTypebra(that.options.categories[index]);
			that.renderImagePreviewContent(that.options.categories[index].children[0]);
		}
	});
}

FileDialog.prototype.renderTypebra = function (data) {
	var that = this;
	that.$filePreview.empty();
	var $typebra = $('<div class="typebra"></div>');
	var $ul = $("<ul>");
	for (var i = 0; i < data.children.length; i++) {
		var item = data.children[i];
		var $li = $("<li>");
		$li.text(item.name);
		$ul.append($li);

		if(i == 0) $li.addClass("active");
	}
	if(data.children.length == 0) $typebra.addClass("none");
	$typebra.append($ul);
	that.$filePreview.append($typebra);

	$("li", $ul).on("click", function (e) {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
}

FileDialog.prototype.renderImagePreviewContent = function (data) {
	var that = this;
	var $imagePreviewContent = $('<div class="imagePreviewContent nonebra" id="imagePreviewContent"></div>');
	var $empty = $('<div class="img-noData">没有更多素材了</div>');

	
	var file1 = new File({ title: "母亲节素材01.png", url: "http://img.liveapp.cn/group3/eng/61/fc/d2fa43d4f1f912efc58f1f783f7c_14622537853754_5.png" });
	$imagePreviewContent.append(file1.$html);
	if(typeof data === "undefined"){
		$imagePreviewContent.append($empty);
	}

	that.$filePreview.append($imagePreviewContent);
}

FileDialog.prototype.show = function () {
	var that = this;
	that.$mask.show();
	that.$html.show();
	$("#fileDialog", that.$html).show();
}

FileDialog.prototype.hide = function () {
	var that = this;
	that.$mask.remove();
	that.$html.remove();
}




//======================================================================================================
var File = function(options){
	var that = this;
	var defaultOptions = { 
		title: "", 
		url: "" 
	};

	var imageTemplate = [
	'<div class="imgPreview">',
		'<div class="dz-details" title="{{ title }}">',
			'<div class="previewImg"></div>',
			'<div class="delbtn"></div>',
		'</div>',
		'<p class="previewname" title="{{ title }}">{{ title }}</p>',
		'<div class="close"></div>',
	'</div>'
	].join('');

	that.template = imageTemplate;
	that.options = $.extend({}, defaultOptions, options);
	that.init();
}

File.prototype.init = function () {
	var that = this;
	var html = template.compile(that.template)(that.options);
	that.$html = $(html);
	that.initEvent();
}

File.prototype.initEvent = function () {
	var that = this;
	that.$html("click", function(e) { //<div class="check"></div>
		var $check = $(".dz-details", this).find("div.check");
	});
}
