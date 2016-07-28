var ChooseList = function (options) {
	var that = this;

	var defaultOptions = {
		adapter: { "type": "direction", "name": "name", "key": "effect" },
		data: null,
		type: "normal", //large normal small
		anim: false,
		list: [], //{ "type":"bounceIn", "typeName": "弹入", "name": "弹入", "effect": "bounceIn", "delay": 0, "duration": 1, "count": 1,"infinite":false }
		onChosenEnd: function (idx, data, item) { }
	};

	that.options = $.extend(true, {}, defaultOptions, options);
	//z-active
	var tpl_large = [
	'<ul class="u-chooseList">',
		'{{ each list as item i }}',
        '<li>',
            '<a href="javascript:void(0);" class="u-image-wrap f-p-0 f-wh-80 {{if selected == item.key}}z-active{{/if}}">',
                '<div class="u-image-large f-wh-80 anime-page-{{ item.key }}"></div>',
            '</a>',
            '<p>{{ item.name }}</p>',
        '</li>',
        '{{ /each }}',
    '</ul>'
	].join('');

	var tpl_normal = [
	'<ul class="u-chooseList">',
		'{{ each list as item i }}',
        '<li>',
            '<a href="javascript:void(0);" class="u-image-wrap f-p-4 {{if selected == item.key}}z-active{{/if}}">',
                '<div class="u-image-large anime-{{ item.key }}"></div>',
                '<i class="icon-x22 icon-x22-tick-circle"></i>',
            '</a>',
            '<p>{{ item.name }}</p>',
        '</li>',
        '{{ /each }}',
    '</ul>'
	].join('');

	var tpl_small = [
	'<ul class="u-chooseList-small">',
		'{{ each list as item i }}',
	    '<li>',
	        '<a href="javascript:void(0);" class="u-image-wrap u-image {{if selected == item.key}}z-active{{/if}}">',
	            '<div class="u-image-small anime-{{ item.type }}"></div>',
	            '<i class="icon-x22 icon-x22-tick-circle"></i>',
	        '</a>',
	        '<p>{{ item.name }}</p>',
	    '</li>',
	    '{{ /each }}',
	'</ul>'
	].join('');

	var adapter = function (data) {
		return $.map(data, function (n) {
			return { 
				type: n[that.options.adapter["type"]], 
				name: n[that.options.adapter["name"]], 
				key: n[that.options.adapter["key"]] 
			};
		});
	}
	
	
	that.active = function (idx) {
		$("li>a", that.$html).removeClass("z-active");
		$("li:eq(" + idx + ")>a", that.$html).addClass("z-active");
	}

	that.animate = function(index) {
		var data = that.options.list[index];
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var exp = data.effect + " 0.8s backwards";
		$("li:eq(" + index + ")>a>div", that.$html).css("animation", exp).one(animationEnd, function() {
	        $(this).css("animation", "none");
	    });
	}

	that.chosen =function (data) {
		if(!data) return;
		$.each(that.options.list, function (i, n) {
			if(n[that.options.adapter["key"]] === data[that.options.adapter["key"]])
				that.active(i);
		});
	}

	that.unchoose = function () {
		$("li>a", that.$html).removeClass("z-active");
	}

	that.initView = function () {
		var tpl = '';
		switch(that.options.type){
			case 'large': tpl = tpl_large; break;
			case 'normal': tpl = tpl_normal; break;
			case 'small': tpl = tpl_small; break;
		}
		var list = adapter(that.options.list);
		that.$html = $(template.compile(tpl)({ list: list, selected: that.options.value }));
		that.chosen(that.options.data);
	}

	that.initEvent = function () {
		$("li", that.$html).on("click", function (e) {
			var $this = $(this);
			var idx = $("li", that.$html).index($this);
			that.options.onChosenEnd(idx, that.options.list[idx], $this);

			that.active(idx);
		})

		if(that.options.anim){
			$("li", that.$html).on("mouseenter", function (e) {
				var $this = $(this);
				var idx = $("li", that.$html).index($this);
				that.animate(idx);
			}).on("mouseleave", function (e) {
				var $this = $(this);
				var idx = $("li", that.$html).index($this);
				$("li:eq(" + idx + ")>a>div", that.$html).css("animation", "none");
			});
		}
	}

	that.initView();
	that.initEvent();
}

