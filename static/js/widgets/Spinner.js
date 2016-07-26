var Spinner = function (options) {
    var that = this;

    var defaultOptions = {
    	min: 0,
    	max: 0,
    	step: 1,
    	value: 0,
    	onChange: function (val) {
    		// body...
    	}
    };

    that.options = $.extend(true, {}, defaultOptions, options);
    //oni-state-disabled  disabled=""
    var tpl = [
    	'<div class="u-spinner">',
            '<div class="oni-spinner oni-widget">',
            	'<button type="button" class="oni-btn">',
            		'<i class="oni-icon oni-icon-minus"></i>',
            	'</button>',
            	'<div class="oni-textbox oni-widget-content">',
            		'<div class="oni-textbox-input-wrap">',
            		'<input type="text" class="oni-textbox-input" style="width: auto;"></div>',
            	'</div>',
            	'<button type="button" class="oni-btn">',
            		'<i class="oni-icon oni-icon-plus"></i>',
            	'</button>',
            '</div>',
        '</div>'
    ].join('');

    that.$html = $(tpl);

    var $btnSub = $("button:eq(0)", that.$html);
    var $btnAdd = $("button:eq(1)", that.$html);
    var $textbox = $("input.oni-textbox-input", that.$html);

    $textbox.val(that.options.value);

    $btnSub.on("click", function (e) {
    	e.stopPropagation();
    	var curr = $textbox.val();
    	if();
    });

    $btnAdd.on("click", function (e) {
    	e.stopPropagation();


    });
}