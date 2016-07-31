var Spinner = function (options) {
    var that = this;

    var defaultOptions = {
    	min: 0,
    	max: 10,
    	step: 1,
    	val: 0,
    	onChange: function (val) { }
    };

    that.options = $.extend(true, {}, defaultOptions, options);
    //oni-state-disabled  disabled=""
    var tpl = [
    	'<div class="u-spinner">',
            '<div class="oni-spinner oni-widget">',
            	'<button type="button" class="oni-btn">',
            		'<i class="oni-icon oni-icon-minus">-</i>',
            	'</button>',
            	'<div class="oni-textbox oni-widget-content">',
            		'<div class="oni-textbox-input-wrap">',
            		'<input type="text" class="oni-textbox-input" style="width: auto;"></div>',
            	'</div>',
            	'<button type="button" class="oni-btn">',
            		'<i class="oni-icon oni-icon-plus">+</i>',
            	'</button>',
            '</div>',
        '</div>'
    ].join('');

    that.$html = $(tpl);

    var $btnSub = $("button:eq(0)", that.$html);
    var $btnAdd = $("button:eq(1)", that.$html);
    var $textbox = $("input.oni-textbox-input", that.$html);

    $textbox.val(that.options.val);

    $btnSub.on("click", function (e) {
    	e.stopPropagation();
    	var temp = parseInt($textbox.val()) - that.options.step;
    	if(temp <= that.options.min){
            temp = that.options.min;
        }
        that.options.val = temp;
        $textbox.val(that.options.val);
        that.options.onChange(that.options.val);
    });

    $btnAdd.on("click", function (e) {
    	e.stopPropagation();

        var temp = parseInt($textbox.val()) + that.options.step;
        if(temp >= that.options.max){
            that.options.val = that.options.max;
            $textbox.val(that.options.val);
            return;
        }
        that.options.val = temp;
        $textbox.val(that.options.val);
        that.options.onChange(that.options.val);
    });

    $textbox.on("keyup", function (e) {
        var val = $textbox.val();
        val = val.replace(/[^0-9-]+/,'');
        var temp = parseFloat(val);
        if(temp >= that.options.max){
            temp = that.options.max;
        }else if(temp <= that.options.min){
            temp = that.options.min;
        }
        that.options.val = temp;
        $textbox.val(that.options.val);
        that.options.onChange(that.options.val);
    });
}