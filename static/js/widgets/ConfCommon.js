var ConfCommon = function (options) {
    var that = this;

    var defaultOptions = {
        x: "currentComponent.options.x",
        y: "currentComponent.options.y",
        w: "currentComponent.options.width",
        h: "currentComponent.options.height"
    };

    that.options = $.extend(true, {}, defaultOptions, options);

    that.template = [
        '<section class="c-conf-section c-conf-common">',
            '<div class="c-conf-row c-conf-row-3">',
                '<label class="c-input-label" for="left">位置</label>',
                '<div class="c-input-box">',
                    '<label class="u-label f-mr-9">X轴</label>',
                    '<input type="text" id="left" class="u-textbox f-mr-40" size="10" />',
                    '<label class="u-label f-mr-9" for="top">Y轴</label>',
                    '<input type="text" id="top" class="u-textbox" size="10" />',
                '</div>',
            '</div>',
            '<div class="c-conf-row">',
                '<label class="c-input-label" for="width">大小</label>',
                '<div class="c-input-box">',
                    '<label class="u-label f-mr-9">宽</label>',
                    '<input type="text" id="width" class="u-textbox f-mr-40" size="10" />',
                    '<label class="u-label f-mr-9">高</label>',
                    '<input type="text" id="height" class="u-textbox" size="10" />',
                '</div>',
            '</div>',
        '</section>'
    ].join('')

    that.$html = $(that.template);

    $("#left", that.$html).attr("ng-model", that.options.x);
    $("#top", that.$html).attr("ng-model", that.options.y);
    $("#width", that.$html).attr("ng-model", that.options.w);
    $("#height", that.$html).attr("ng-model", that.options.h);
}