var ConfStyle = function (options) {
    var that = this;

    var defaultOptions = {
        data: { 
            backgroundColor: "rgba(0, 0, 0, 0)", 
            borderWidth: 0, 
            borderColor: "rgba(0, 0, 0, 0)",
            borderRadius: 0,
            opacity: 100,
            rotate: 0
        },
        onChange: function (data) { }
    }

    that.options = $.extend({}, defaultOptions, options);

    var tpl_wrapper = [
    '<section class="c-conf-section c-conf-style z-expand">',
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label">背景</label><div class="c-input-box"></div>',
            '</div>',
        '</div>',
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label">边框</label><div class="c-input-box"></div>',
            '</div>',
        '</div>',
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label">圆角</label><div class="c-input-box"></div>',
            '</div>',
        '</div>',
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label">透明</label><div class="c-input-box"></div>',
            '</div>',
        '</div>',
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label">旋转</label><div class="c-input-box"></div>',
            '</div>',
        '</div>',
    '</section>'
    ].join('');

    var tpl_colorpicker = [
        '<div class="u-colorpicker f-ml-6" style="overflow:visible;">',
            '<input type="text" style="color: rgb(0, 0, 0); background: rgb(204, 204, 204);">',          
            '<a href="javascript:void(0);" class="small"> <i class="icon-x20 icon-x20-color"></i></a>',
        '</div>'
    ].join('');

    function onBorderRadiusChange(data) {
        that.options.data["borderRadius"] = data;
        that.options.onChange(that.options.data);
    }

    function onBorderWidthChange(data) {
        that.options.data["borderWidth"] = data;
        that.options.onChange(that.options.data);
    }

    function onOpacityChange(data) {
        that.options.data["opacity"] = data;
        that.options.onChange(that.options.data);
    }

    function onRotateChange(data) {
        that.options.data["rotate"] = data;
        that.options.onChange(that.options.data);
    }

    var defBorderWidth = that.options.data? that.options.data["borderWidth"] : 0;
    var defBorderRadius = that.options.data? that.options.data["borderRadius"] : 0;
    var defOpacity = that.options.data? that.options.data["opacity"] : 0;
    var defRotate = that.options.data? that.options.data["rotate"] : 0;

    var colorpickerBackgroundColor = $(tpl_colorpicker);
    var spinnerBorderWidth = new Spinner({ val: defBorderWidth, min: 0, max: 10, step: 1, onChange: onBorderWidthChange});
    var colorpickerBorderColor = $(tpl_colorpicker);
    var sliderBorderRadius = new Slider({ val: defBorderRadius, min: 0, max: 50, step: 1, onChange: onBorderRadiusChange });
    var sliderOpacity = new Slider({ val: defOpacity, min: 0, max: 100, step: 1, onChange: onOpacityChange });
    var sliderRotate = new Slider({ val: defRotate, min: 0, max: 360, step: 1, onChange: onRotateChange });

    colorpickerBackgroundColor.colorpicker({
        onChange: function(color){
            colorpickerBackgroundColor.css("background-color", color);
            that.options.data["backgroundColor"] = color;
            that.options.onChange(that.options.data);
        }
    });

    colorpickerBorderColor.colorpicker({
        onChange: function(color){
            colorpickerBorderColor.css("background-color", color);
            that.options.data["borderColor"] = color;
            that.options.onChange(that.options.data);
        }
    });

    that.initView = function () {
        that.$html = $(tpl_wrapper);
        that.$row1 = $(".c-input-box:eq(0)", that.$html);
        that.$row2 = $(".c-input-box:eq(1)", that.$html);
        that.$row3 = $(".c-input-box:eq(2)", that.$html);
        that.$row4 = $(".c-input-box:eq(3)", that.$html);
        that.$row5 = $(".c-input-box:eq(4)", that.$html);

        that.$row1.append(colorpickerBackgroundColor);
        that.$row2.append(spinnerBorderWidth.$html);
        that.$row2.append(colorpickerBorderColor);
        that.$row3.append(sliderBorderRadius.$html);
        that.$row4.append(sliderOpacity.$html);
        that.$row5.append(sliderRotate.$html);

        colorpickerBackgroundColor.css("background-color", that.options.data["backgroundColor"]);
        colorpickerBorderColor.css("background-color", that.options.data["borderColor"]);
    }

    that.initView();
}