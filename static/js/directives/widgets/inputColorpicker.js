; (function ($, window, document, undefined) {

	var data_colorpicker = { colors : [
		{ "color": "none", "src": "static/images/colorpicker_colornone.png" },
		{ "color": "#FFFFFF" },
		{ "color": "#E5E5E5" },
		{ "color": "#CCCCCC" },
		{ "color": "#999999" },
		{ "color": "#808080" },
		{ "color": "#666666" },
		{ "color": "#333333" },
		{ "color": "#222222" },
		{ "color": "#000000" },
		{ "color": "#E5B8AE" },
		{ "color": "#F3CCCB" },
		{ "color": "#FCE5CB" },
		{ "color": "#FFF1CC" },
		{ "color": "#D9E9D2" },
		{ "color": "#C0F8F1" },
		{ "color": "#D0E0E4" },
		{ "color": "#CFE2F4" },
		{ "color": "#D9D2EA" },
		{ "color": "#EAD1DC" },
		{ "color": "#971200" },
		{ "color": "#FD2500" },
		{ "color": "#FE9900" },
		{ "color": "#FFFB00" },
		{ "color": "#2DF900" },
		{ "color": "#26FCCF" },
		{ "color": "#24FDFF" },
		{ "color": "#0433FF" },
		{ "color": "#9637FF" },
		{ "color": "#FC40FF" },
		{ "color": "#A52000" },
		{ "color": "#CA1B00" },
		{ "color": "#E5912A" },
		{ "color": "#F1C00A" },
		{ "color": "#6CA647" },
		{ "color": "#19A391" },
		{ "color": "#46818F" },
		{ "color": "#3D86C9" },
		{ "color": "#6652AA" },
		{ "color": "#A54F7A" },
		{ "color": "#5A1000" },
		{ "color": "#650800" },
		{ "color": "#773F00" },
		{ "color": "#7F5F00" },
		{ "color": "#294D09" },
		{ "color": "#0A7366" },
		{ "color": "#0D343E" },
		{ "color": "#073865" },
		{ "color": "#1E154F" },
		{ "color": "#4B1431" }
	]};

	var tpl_colorpicker_wrapper = [
	'<div class="u-colorpicker f-ml-6" style="overflow:visible;">',
	    '<input type="text" style="color: rgb(0, 0, 0); background: rgb(204, 204, 204);">',
	    '<a href="javascript:void(0);" class="small"><i class="icon-x20 icon-x20-color"></i></a>',
	'</div>'
	].join('');

	var tpl_colorpicker = [
	'<div class="oni-colorpicker" style="height: 184px; display: none; position:absolute;">',
		'<div class="oni-colorpicker-color-list">',
		    '{{ each colors as color i}}',
			'<div class="color-box" style="background-color: {{ color.color }};">',
				'{{ if color.src != null }}',
				'<img src="{{ color.src }}">',
				'{{ /if }}',
			'</div>',
			'{{ /each }}',
			'<hr>',
			'<div class="switch" style="margin: 0;">',
				'<div class="title" style="padding: 0;">更多颜色</div>',
				'<div class="u-iphone-switch switch-bg" style="padding: 1px; margin-top:-4px; color:#fff;">',
					'<div class="switch-btn" style="color:#fff;border: 1px solid;"></div>',
				'</div>',
			'</div>',
		'</div>',
	'</div>',
	].join('');

	var ColorPicker = function (element, options) {
		this.defaults = {
			showIcon: true,
			offset: { top: 0, left: 0 },
			onChange: function(color){}
		};
		this.$element = $(element);
		this.options = $.extend({}, this.defaults, options);
	}

	ColorPicker.prototype.init = function () {

		var picker = template.compile(tpl_colorpicker)(data_colorpicker);

		var $wapper = $(tpl_colorpicker_wrapper), 
		    $picker = $(picker), 
		    options = this.options, 
		    $element = this.$element;

		this.$wapper = $wapper;
		this.$picker = $picker;

		$wapper.append($picker);
		$wapper.find(".oni-colorpicker").hide();

		if(!options.showIcon){
			$wapper.removeClass();
			$wapper.find("input").hide();
			$wapper.find("a.small").hide();
		}
		
		var top = $element.offset().top;
		var left = $element.offset().left;
		$wapper.find(".oni-colorpicker").css("top", options.offset.top);
		$wapper.find(".oni-colorpicker").css("left", options.offset.left );

		$element.replaceWith($wapper);
		$("div.oni-colorpicker-color-list>div.color-box", $wapper).on("click", function(e){
			e.stopPropagation();
			var color = $(this).css("background-color");
			options.onChange(color);
		})

		$("body").on("click", function(){
			$wapper.find(".oni-colorpicker").hide();
		});

		$wapper.on("click", function(e){
			e.stopPropagation();
			$("body").find(".oni-colorpicker").hide();
			$wapper.find(".oni-colorpicker").toggle();
		});

	}

	ColorPicker.prototype.show = function(){
		this.$wapper.find(".oni-colorpicker").show();
	}

	ColorPicker.prototype.hide = function(){
		this.$wapper.find(".oni-colorpicker").hide();
	}

	ColorPicker.prototype.toggle = function(){ 
		this.$wapper.find(".oni-colorpicker").toggle();
	}

	$.fn.colorpicker = function (options) {
        return $.map(this, function(element){
        	var colorPicker = new ColorPicker(element, options);
        	colorPicker.init();
        	return colorPicker;
        });
    }
})(jQuery, window, document);

var tpl_colorpicker = [
'<div class="u-colorpicker f-ml-6">',
    '<input type="text" style="color: rgb(0, 0, 0); background: rgb(204, 204, 204);">',
    '<a href="javascript:void(0);" class="small"><i class="icon-x20 icon-x20-color"></i>',
    '</a>',
'</div>',
].join('');

//<div ng-model="currentComponent.borderColor" ipr-colorpicker></div>
mainModule.directive('iprColorpicker', function() {
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {},
        replace: true,
        template: tpl_colorpicker,
        link: function(scope, element, attrs, ngModelController) {
        	ngModelController.$render = function() {

        	}

        	function updateModel(val) {
            	ngModelController.$setViewValue(val);
            	ngModelController.$render();
            }

            var init = function () { 
            	element.colorpicker({
                    offset: { top: 25, left: -215 },
            		onChange: function(color){
            			ngModelController.$setViewValue(color);
	                	ngModelController.$render();
            		}
            	});
            }

            init();
 		}
    };
});