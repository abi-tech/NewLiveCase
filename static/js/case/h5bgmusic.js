var H5BGMusic = function (options) {
	var that = this;
	//z-pause z-play u-globalAudio-1
	var defaultOptions = {
		url: null, 
		playing: false, 
		loop: true, 
		preload: "auto",
		pos: "right: 20px; top: 20px;",
		autoplay: "autoplay",
		coffee: {
            steams: ["<img src='/static/images/globalAudio.png' />"],  
            steamHeight: 100,  
            steamWidth: 44  
        }
	};

	that.options = $.extend(true, {}, defaultOptions, options);

	var tpl = [
	'<div style="position: relative; z-index: 9399;">',
		'<div id="globalAudio" class="u-globalAudio globalAudio-default">',
			'<div class="u-globalAudio-0"></div>',
			'<audio id="globalAudioPlayer"></audio>',
			'<div id="coffee"></div>',
		'</div>',
	'</div>'
	].join('');

	that.play = function () {
		$("#globalAudio", that.$html)
			.removeClass("z-pause z-play")
			.addClass("z-play");

		$(".u-globalAudio-0", that.$html)
			.removeClass()
			.addClass("u-globalAudio-0 u-globalAudio-1");

		$('.coffee-steam-box', that.$html).show(500);
		that.options.playing = true;
		that.$music[0].play();
	}

	that.pause = function () {
		$("#globalAudio", that.$html)
			.removeClass("z-pause z-play")
			.addClass("z-pause");

		$(".u-globalAudio-0", that.$html)
			.removeClass("u-globalAudio-1");

		$('.coffee-steam-box', that.$html).hide(500);
		that.options.playing = false;
		that.$music[0].pause();
	}

	that.toggle = function () {
		if(that.options.playing)
			that.pause();
		else
			that.play();
	}

	that.setPos = function (pos) {
		that.options.pos = pos;
		$("#globalAudio", that.$html).attr("style", that.options.pos);
	}

	that.setMusic = function (url) {
		that.options.url = url;
		if (url) {
			that.$music.attr("loop", that.options.loop);
			that.$music.attr("preload", that.options.preload);
			that.$music.attr("autoplay", that.options.autoplay);
			that.$music.prop("src", url);
			that.play();
		}else{
			that.$html.remove();
		}
	}

	that.initView = function () {
		var url = that.options.url;
		that.$html = $(tpl);
		that.$music = $("#globalAudioPlayer", that.$html);

		that.setPos(that.options.pos);
		if (url) {
			$("#coffee", that.$html).coffee(that.options.coffee);

	        $("body").append(that.$html);

	        that.setMusic(url);
	    }
	}

	that.initEvent = function () {
		$("#globalAudio", that.$html).on("click", function (e) {
			that.toggle();
		});
	}

	that.initView();
	that.initEvent();

	return this;
}