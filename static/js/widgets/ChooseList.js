var ChooseList = function (options) {
	var that = this;

	var defaultOptions = {
		value: "",
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
            '<a href="javascript:void(0);" class="u-image-wrap f-p-0 f-wh-80 {{if selected == item.effect}}z-active{{/if}}">',
                '<div class="u-image-large f-wh-80 anime-page-{{ item.effect }}"></div>',
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
            '<a href="javascript:void(0);" class="u-image-wrap f-p-4 {{if selected == item.effect}}z-active{{/if}}">',
                '<div class="u-image-large anime-{{ item.effect }}"></div>',
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
	        '<a href="javascript:void(0);" class="u-image-wrap u-image {{if selected == item.effect}}z-active{{/if}}">',
	            '<div class="u-image-small anime-{{ item.direction }}"></div>',
	            '<i class="icon-x22 icon-x22-tick-circle"></i>',
	        '</a>',
	        '<p>{{ item.name }}</p>',
	    '</li>',
	    '{{ /each }}',
	'</ul>'
	].join('');

	var tpl = '';
	switch(that.options.type){
		case 'large': tpl = tpl_large; break;
		case 'normal': tpl = tpl_normal; break;
		case 'small': tpl = tpl_small; break;
	}
	that.$html = $(template.compile(tpl)({ list: that.options.list, selected: that.options.value }));
	
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

	that.unchoose = function () {
		$("li>a", that.$html).removeClass("z-active");
	}

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

