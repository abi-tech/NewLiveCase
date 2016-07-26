var ConfStyle = function (options) {
    var that = this;

    var defaultOptions = {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 0,
        borderColor: "rgba(0, 0, 0, 0)",
        borderRadius: 0,
        opacity: 1,
        rotate: 0,
        columns: [
            { name: "背景", doms: [] },
            { name: "边框", doms: [] },
            { name: "圆角", doms: [] },
            { name: "透明", doms: [] },
            { name: "旋转", doms: [] }
        ],
        onChange: function (options) {
            console.log(options);
        }
    }

    $("#colorpicker").colorpicker({
        onChange: function(color){
            console.log(color);
        }
    });

    var tpl_colorpicker = [
        '<div class="u-colorpicker f-ml-6" style="overflow:visible;">',
            '<input type="text" style="color: rgb(0, 0, 0); background: rgb(204, 204, 204);">',          
            '<a href="javascript:void(0);" class="small"> <i class="icon-x20 icon-x20-color"></i></a>',
        '</div>'
    ].join('');
    var col_1_colorpicker = $(tpl_colorpicker);
    var col_2_colorpicker = $(tpl_colorpicker);

    col_1_colorpicker.colorpicker({
        onChange: function(color){
            that.
        }
    });

    col_2_colorpicker.colorpicker({
        onChange: function(color){
            console.log(color);
        }
    });

    that.options = $.extend({}, defaultOptions, options);

    that.options.columns[0].doms.push(col_1_colorpicker);
    that.options.columns[1].doms.push(col_2_colorpicker);
    that.options.columns[2].doms.push('<input type="text" id="borderRadius" class="u-textbox u-textbox-medium f-ml-4" size="6">');
    that.options.columns[3].doms.push('<input type="text" id="opacity" class="u-textbox u-textbox-medium f-ml-4" size="6">');
    that.options.columns[4].doms.push('<input type="text" id="rotate" class="u-textbox u-textbox-medium f-ml-4" size="6">');

    var tpl_wrapper = '<section class="c-conf-section c-conf-style z-expand"></section>';
    that.$html = $(tpl_wrapper);

    $.each(that.options.columns, function (i, n) {
        var panel = new ConfPanel(n);
        that.$html.append(panel.$html);
    });
}