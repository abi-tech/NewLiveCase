var Slider = function (options) {
	var that = this;
	var defaultOptions = {
		val: 0,
		min: 0,
		max: 0,
		step: 1,
		onChange: function (data) { }
	};

	that.options = $.extend({}, defaultOptions, options);

	var tpl_inputbox_slider = [
	'<div class="c-input-box">',
	    '<div class="u-slider f-mr-14">',
	        '<div style="top:-26px; position:relative">',
	            '<input type="hidden" value="" />',
	        '</div>',
	    '</div>',
	    '<input style="top:-4px; position:relative" type="text" class="u-textbox u-textbox-medium f-ml-4" />',
	'</div>'
	].join('');

	that.$html = $(tpl_inputbox_slider);
	var $slider = that.$html.find('input[type="hidden"]');
    var $input = that.$html.find('input[type="text"]');

    var slider = $slider.ionRangeSlider({
        type: "single",
        min: that.options.min,
        max: that.options.max,
        step: that.options.step,
        from: 0,
        hide_min_max: true,
        hide_from_to: true,
        grid: false,
        onChange: function (data) { 
        	$input.val(data.from);
        	that.options.onChange(data);
        }
    })
    .data("ionRangeSlider");

    $input.on("keyup", function(e){
        var val = $input.val().replace(/[^\d]/g,'');
        slider.update({ from : val });
    });

    $input.val(that.options.val);
}