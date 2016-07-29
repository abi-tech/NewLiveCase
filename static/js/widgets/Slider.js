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
	            '<input type="hidden" value="' + that.options.val + '" />',
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
        from: that.options.val,
        hide_min_max: true,
        hide_from_to: true,
        grid: false,
        onChange: function (data) {
            $input.val(data.from);
        },
        onFinish: function (data) { 
        	that.options.onChange(data.from);
        }
    })
    .data("ionRangeSlider");

    $input.on("keyup", function(e){
        var val = $input.val().replace(/[^\d]/g,'');
        var temp = parseFloat(val);
        if(val >= that.options.max) {
        	temp = that.options.max;
        	$input.val(that.options.max);
        }else if(val <= that.options.min){
        	temp = that.options.min;
        	$input.val(that.options.min);
        }
        $input.val(temp);
        slider.update({ from : temp });
        that.options.onChange(temp);
    });

    $input.val(that.options.val);
}