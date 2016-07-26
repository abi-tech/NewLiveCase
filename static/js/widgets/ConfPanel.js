var ConfPanel = function (options) {
    var that = this;

    var defaultOptions = {
        name: "",
        doms: []
    };

    that.template = [
        '<div class="c-conf-panel">',
            '<div class="c-conf-row">',
                '<label class="c-input-label"></label>',
                '<div class="c-input-box"></div>',
            '</div>',
        '</div>'
    ].join('');

    that.options = $.extend({}, defaultOptions, options);
    that.$html = $(that.template);
    console.log(that.options.name);
    $("label.c-input-label", that.$html).text(that.options.name);

    $.each(that.options.doms, function (i, n) {
        $("div.c-input-box", that.$html).append(n);
    });
}