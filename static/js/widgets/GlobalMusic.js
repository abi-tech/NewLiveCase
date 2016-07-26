var GlobalMusic = function (options) {
	var that = this;
	var defaultOptions = {
		playing: false,
		data: null,
		onChosenEnd: function (data) { }
	};

	that.options = $.extend(true, {}, defaultOptions, options);
	// audio-select-border
	var template = [
	'<div class="g-global-audio" style="display: block; top: -200%;">',
		'<section class="m-globalAudio">',
			'<header><div class="title">背景音乐</div></header>',
			'<section class="has-audio">',
				'<section class="audio-edit-area">',
					'<span class="has-back-img" title="更换音乐"></span>',
					'<span class="audio-name">没有背景音乐</span>',
					'<span class="audio-btns">',
						'<a href="#@" class="icon-update" title="更换音乐">添加</a>',
						'<a href="#@" title="播放/暂停" class="icon-music-none">试听</a>',
						'<a href="#@" class="icon-delete" title="删除音乐"></a>',
					'</span>',
				'</section>',
				'<section class="audio-position-select">',
					'<h3>设置音乐播放器页面位置(默认右上角)</h3>',
					'<ul>',
						'<li class="audio-position-list-0">',
							'<span class="icon-backImg"></span>',
							'<span class="icon-position">右上</span> ',
							'<i class="icon-selected" style="display: inline;"></i>',
							'<i class="icon-music icon-music-1"></i>',
						'</li>',
						'<li class="audio-position-list-1">',
							'<span class="icon-backImg"></span>',
							'<span class="icon-position">右下</span>',
							'<i style="display: none;"></i>',
							'<i class="icon-music icon-music-1"></i>',
						'</li>',
						'<li class="audio-position-list-2">',
							'<span class="icon-backImg"></span>',
							'<span class="icon-position">左上</span>',
							'<i style="display: none;"></i>',
							'<i class="icon-music icon-music-1"></i>',
						'</li>',
						'<li class="audio-position-list-3">',
							'<span class="icon-backImg"></span>',
							'<span class="icon-position">左下</span>',
							'<i style="display: none;"></i>',
							'<i class="icon-music icon-music-1"></i>',
						'</li>',
					'</ul>',
				'</section>',
			'</section>',
		'</section>',
	'</div>'
	].join('');


	that.audio = new Audio;
	that.$mask = $('<div class="oni-dialog-layout u-dialog-layout" style="display: none; z-index: 100001; height: auto; width: auto; top: 0px; position: fixed;"></div>');
	that.$html = $(template);
	that.$name = $("span.audio-name", that.$html);
	that.$change = $("a.icon-update", that.$html);
	that.$try = $("a.icon-music-none", that.$html);
	that.$delete = $("a.icon-delete", that.$html);
	that.$positions = $(".audio-position-select ul li", that.$html);
	that.$li_0 = $("li.audio-position-list-0", that.$html);
	that.$li_1 = $("li.audio-position-list-1", that.$html);
	that.$li_2 = $("li.audio-position-list-2", that.$html);
	that.$li_3 = $("li.audio-position-list-3", that.$html);

	that.setMusic = function (data) {
		// { "name": "", "url": "" }
		if(!data) {
			that._view1();
			return;
		}
		that.options.data = $.extend(true, {}, data);
		that._view2();
		that.play();
	}

	that._view1 = function () {
		that.$name.text("没有背景音乐");
		that.$change.text("添加");
		that.$try.text("试听");

		that.$try.removeClass();
		that.$try.addClass("icon-music-none");
	}

	that._view2 = function () {
		that.$name.text(that.options.data.name);
		that.$change.text("替换");
		that.$try.text("暂停");

		that.$try.removeClass();
		that.$try.addClass("icon-pause");
	}

	that.play = function () {
		that.audio.loop = true;
		that.audio.src = that.options.data.url; 
		that.audio.play();
		that.$try.text("暂停");
		that.$try.removeClass();
		that.$try.addClass("icon-pause");
		that.options.playing = true;
	}

	that.pause = function () {
		that.audio.pause();
		that.audio.src = "";
		that.$try.text("试听");
		that.$try.removeClass();
		that.$try.addClass(that.options.data? "icon-play" : "icon-music-none");
		that.options.playing = false;
	}

	that.show = function () {
		that.$mask.show();
		that.$html.css("top", "60px");
	}

	that.hide = function () {
		that.pause();
        that.$html.css("top", "-200%");
		setTimeout(function () {
			that.$mask.hide();
		}, 200);
	}

	that.$change.on("click", function (e) {
		e.stopPropagation();
		var fileDialog = new FileDialog({
			type: "music", // image music
			onChosenEnd: function (item) {
				if(!item) return;
				var data = { "name": item.options.name, "url": item.options.url };
				that.options.data = data;
				that.options.onChosenEnd(data);
				that._view2();
				that.play();
			}
		});
		fileDialog.show();
	});

	that.$try.on("click", function (e) {
		e.stopPropagation();
		if(!that.options.data) return;

		that.options.playing = !that.options.playing;
		if(that.options.playing){
			that.play();
		}else{
			that.pause();
		}
	});

	that.$delete.on("click", function (e) {
		e.stopPropagation();
		that.options.data = null;
		that.options.onChosenEnd(null);
		that.pause();
		that._view1();
	});

	$(".audio-position-select li", that.$html).on("click", function (e) {
		var index = that.$positions.index($(this));
        var $i = $("i:eq(0)", this);
        $("i:eq(0)", that.$positions).removeClass("icon-selected").css("display", "none");
        $i.addClass("icon-selected").css("display", "inline")
	});

	that.$mask.on("click", function (e) {
		that.hide();
	});

	$("body").append(that.$mask);
	$("body").append(that.$html);
}

