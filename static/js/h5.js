var H5ComponentBase = ExClass({
    initialize: function(options) {
        var that = this;
        var defaultOptions = {
            mode: '1', // 设计 1 显示 2
            active: false,
            type: 'base',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            center: false,
            scale: constants.scale,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0,
            borderColor: "rgba(0, 0, 0, 0)",
            borderRadius: 0,
            opacity: 100,
            rotate: 0,
            zIndex: 10000,
            animateIn: null,
            animateOut: null,
            containerCss: { 
                "width": "0px",
                "height": "0px",
                "top": "0px",
                "left": "0px",
                "transform": "rotate(0deg)",
                "z-index": 10000,
                "cursor": "move",
                "display": "block"
            },
            componentCss: { },
            innerCss: { },
            onChosenEnd: function(){},
            onDragEnd: function(){},
            onResizeEnd: function(){}
        }

        that.id = ('h5_c_' + Math.random()).replace('.', '_');

        that.wrapperTemplate = [
            '<div class="f-abs c-c-container" style="cursor: move" ng-click="click(component, $event)">',
                '<div class="tl-c"></div><div class="tr-c"></div><div class="bl-c"></div><div class="br-c"></div>',
            '</div>'
        ].join('');

        that.containerTemplate = '<div class="h5_component"></div>';

        that.confHeaderTemplate = [
            '<header class="c-conf-header">',
                '<div class="c-compnent-icon"></div>',
                '<span style="color:#444"></span>',
            '</header>'
        ].join('');

        //wrapper 在设计模式下加载 用于组件的 位置 宽高 大小 控制
        //container 在显示模式下设置 
        //component 控制组件的外观
        //inner 控制组件的内容

        that.options = $.extend(true, {}, defaultOptions, options);
        //console.log(that.options);
        //$.extend(that, that.options);

        that._build();
    },
    _setCss: function ($html, css) {
        for(var key in css){
            $html.css(key, css[key]);
        }
    },
    setZIndex: function(zIndex){
        this.options.zIndex = zIndex;
        this.$html.css("z-index", zIndex);
    },
    setBackgroundColor: function (color) {
        //设置背景颜色
        this.options.componentCss["background-color"] = color;
        this.$component.css("background-color", color);
    },
    setBorderWidth: function (width) {
        //设置边框宽度
        this.options.componentCss["border-width"] = width;
        this.$component.css("border-width", width);
    },
    setBorderColor: function (color) {
        //设置边框颜色
        this.options.componentCss["border-color"] = color;
        this.$component.css("border-color", color);
    },
    setBorderRadius: function (radius) {
        //设置边框圆角
        this.options.componentCss["border-radius"] = radius;
        this.$component.css("border-radius", radius);
    },
    setOpacity: function (opacity) {
        //设置透明度
        this.options.componentCss["opacity"] = opacity;
        this.$component.css("opacity", opacity);
    },
    setRotate: function (rotate) {
        //设置旋转角度 transform: ;
        this.options.componentCss["transform"] = rotate;
        this.$wrapper.css("transform", rotate);
        this.$component.css("transform", rotate);
    },
    setWidth: function (width) {
        //设置宽度
        this.width = width;
        this.options.containerCss["width"] = this._scale(width);
        this.$wrapper.css("width", this._scale(width));
    },
    setHeight: function (height) {
        //设置高度
        this.height = height;
        this.options.containerCss["height"] = this._scale(height);
        this.$wrapper.css("height", this._scale(height));
    },
    setLeft: function (left) {
        //设置x
        this.left = left;
        this.options.containerCss["left"] = this._scale(x);
        this.$wrapper.css("left", this._scale(x));
    },
    setTop: function (top) {
        //设置y
        this.top = y;
        this.options.containerCss["top"] = this._scale(y);
        this.$wrapper.css("top", this._scale(y));
    },
    setAnimateIn: function (animation) {
        //设置动画进入
        $.extend(this.options.animateIn, animation);
    },
    setAnimateOut: function (animation) {
        //设置动画退出
        $.extend(this.options.animateOut, animation);
    },
    animateIn: function () {
        this.animate(this.options.animateIn);
    },
    animateOut: function () {
        this.animate(this.options.animateOut);
    },
    animate: function(animation) { 
        var that = this;
        if(!animation) return;

        comUtils.animate("组件动画", that.$container, animation);
    },
    chosen: function () {
        //添加选中样式
        var that = this;
        $(".c-c-container").removeClass("u-comChoose");
        that.$wrapper.addClass("u-comChoose");
        that.options.onChosenEnd();
    },
    previewTemplate: function () {
        return;
    },
    setViewCss: function (argument) {
        // body...
    },
    setHtmlCss: function (argument) {
        // body...
    },
    getScaleContainerCss: function () {
        var css = $.extend({}, this.options.containerCss);
        css["top"] = this.options.top * this.options.scale;
        css["left"] = this.options.left * this.options.scale;
        css["width"] = this.options.width * this.options.scale;
        css["height"] = this.options.height * this.options.scale;
        css["transform"] = "rotate(" + this.options.rotate + "deg)";
        return css;
    },
    refreshContainerCss: function () {
        this.options.containerCss["top"] = this.options.top;
        this.options.containerCss["left"] = this.options.left;
        this.options.containerCss["width"] = this.options.width;
        this.options.containerCss["height"] = this.options.height;
        this.options.containerCss["z-index"] = this.options.zIndex;
    },
    refreshComponentCss: function () {
        this.options.componentCss["background-color"] = this.options.backgroundColor;
        this.options.componentCss["border-width"] = this.options.borderWidth;
        this.options.componentCss["border-color"] = this.options.borderColor;
        this.options.componentCss["border-radius"] = this.options.borderRadius;
        this.options.componentCss["opacity"] = parseInt(this.options.opacity) / 100;
        this.options.componentCss["transform"] = "rotate(" + this.options.rotate + "deg)";
    },
    buildView: function () {
        var that = this;
        that.refreshContainerCss();
        that.refreshComponentCss();
        //生成模板
        that.$viewContainer = $(that.containerTemplate);
        that.$viewComponent = $(that.componentTemplate);
        that.$viewInner = $(that.innerTemplate);
        that.$view = that.$viewContainer;
        //组织结构
        that.$viewComponent.append(that.$viewInner);
        that.$viewContainer.append(that.$viewComponent);
        //设置样式
        that.$viewContainer.addClass("c-" + that.options.type);
        that.$viewContainer.css("position", "absolute");

        that._setCss(that.$viewContainer, that.options.containerCss);
        that._setCss(that.$viewComponent, that.options.componentCss);
        that._setCss(that.$viewInner, that.options.innerCss); //console.log("h5", that.$viewInner);

        that.$view.attr("data-id", that.id);
    },
    buildHtml: function () {
        var that = this;
        that.refreshContainerCss();
        that.refreshComponentCss();

        that.$wrapper = $(that.wrapperTemplate);
        that.$container = $(that.containerTemplate);
        that.$component = $(that.componentTemplate);
        that.$inner = $(that.innerTemplate);
        
        that.$component.append(that.$inner);
        that.$container.append(that.$component);
        that.$wrapper.prepend(that.$container);
        that.$html = that.$wrapper;
        that.interact = interact(that.$html[0], { styleCursor: false });
        that._bind();
        that._setCss(that.$wrapper, that.getScaleContainerCss());
        that._setCss(that.$component, that.options.componentCss);
        that._setCss(that.$inner, that.options.innerCss);

        if(that.options.active)
            that.chosen();
        that.$html.attr("data-id", that.id);
    },
    _build: function() {
        var that = this;
        
        that.buildView();
        that.buildHtml();

        that.$container.on('onLoad',function(){ console.log("that.$container.onLoad");
            that.animateIn();
            return false;   // 阻止事件向上传播         
        });
        that.$container.on('onLeave',function(){
            that.animate(that.options.animateOut);
            return false;   // 阻止事件向上传播             
        });

        //that.$container.trigger('onLoad');
    },
    _bind: function(){
        var that = this;
        that._drag();
        that._resize();
        that._moveend();
        that._resizeend();
        that._actionChecker();

        // that.$html.on('click', function (event) { console.log("component clicked!");
        //     event.stopPropagation()
        //     that.chosen();
        // });

        $(".tr-c,.bl-c", that.$html).on('mouseenter', function (e) {
            that.$html.css("cursor", "ne-resize"); 
        }).on('mouseleave', function (e) {
            that.$html.css("cursor", "move");
        });

        $(".tl-c,.br-c", that.$html).on('mouseenter', function () {
            that.$html.css("cursor", "nw-resize");
        }).on('mouseleave', function (e) {
            that.$html.css("cursor", "move");
        });

        that.$inner.on("mousemove", function (e) {
            that.$html.css("cursor", "move");
        });
    },
    _scale: function(val){
        return val * this.options.scale;
    },
    _drag: function(){
        var that = this;
        that.interact.draggable({
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 1.05, left: 1.05, bottom: -0.05, right: -0.05 }
            },
            onmove: function (event) {
                var target = event.target,
                    x = (parseFloat($(event.target).css('left')) || 0),
                    y = (parseFloat($(event.target).css('top')) || 0);

                x = x + event.dx;
                y = y + event.dy;

                $(event.target).css('left', x);
                $(event.target).css('top', y);

                that.options.left = parseInt(x / that.options.scale);
                that.options.top = parseInt(y / that.options.scale);

                $("#left").val(parseInt(x));
                $("#top").val(parseInt(y));
                that.$view.css('left', that.options.left);
                that.$view.css('top', that.options.top);
                //TODO 移动时修改 top left
                if(typeof that.onDragEnd === 'function')
                    that.onDragEnd(that.$html, that.options.left, that.options.top);
            }
        });
    },
    _resize: function(){
        var that = this;
        that.interact.resizable({
            preserveAspectRatio: that.ratio,
            edges: { left: true, right: true, bottom: true, top: true }
        })
        .on('resizemove', function (event) {
            var target = event.target,
                   x = (parseFloat($(event.target).css('left')) || 0),
                   y = (parseFloat($(event.target).css('top')) || 0);

            x += event.deltaRect.left;
            y += event.deltaRect.top;
            w = event.rect.width;
            h = event.rect.height;

            $(event.target).css('left', x);
            $(event.target).css('top', y);
            $(event.target).css('width', w);
            $(event.target).css('height', h);

            that.options.left = parseInt(x / that.options.scale);
            that.options.top = parseInt(y / that.options.scale);
            that.options.width = parseInt(w / that.options.scale);
            that.options.height = parseInt(h / that.options.scale);

            $("#left").val(that.options.left);
            $("#top").val(that.options.top);
            $("#width").val(that.options.width);
            $("#height").val(that.options.height);
            that.$view.css('left', that.options.left);
            that.$view.css('top', that.options.top);
            that.$view.css('width', that.options.width);
            that.$view.css('height', that.options.height);
            //TODO 移动时修改 top left width height
            if(typeof that.onResizeEnd === 'function')
                that.onResizeEnd(that.$html, that.options.left, that.options.top, that.options.width, that.options.height);
        });
    },
    _moveend: function () {
        var that = this;
        that.interact.on('dragend resizeend', function(event){
            // console.log('dragend resizeend', event);
            // var containerCss = $.extend({}, that.options.containerCss)
            // containerCss["width"] = that.options.width;
            // containerCss["height"] = that.options.height;
            // containerCss["top"] = that.options.y;
            // containerCss["left"] = that.options.x;
            // that._setCss(that.$viewContainer, containerCss);
            // that._setCss(that.$viewInner, that.options.innerCss);
        });
    },
    _resizeend: function(){
        var that = this;
        that.interact.on('resizeend', function (event) {
            $(that.$html).css("cursor", "move");
        });
    },
    _actionChecker: function(){
        var that = this;
        that.interact.actionChecker(function (pointer, event, action, interactable, $html, interaction) {
            if (action.name === 'resize' && $($html).hasClass("u-comChoose")) {
                var cursorKey = 'resize',
                    edgeNames = ['top', 'bottom', 'left', 'right'];

                for (var i = 0; i < 4; i++) {
                    if (action.edges[edgeNames[i]]) {
                        cursorKey += edgeNames[i];
                    }
                }
                cursor = interact.debug().actionCursors[cursorKey];
                $(that.$html).css("cursor", cursor);
            } else {
                action.name = 'drag';
            }

            if (action.name === 'drag') {
                $(that.$html).css("cursor", "move");
            }
            return action;
        });
    },
    setComponentCss: function (data) {
        var that = this;
        $.extend(that.options, data);
        
        that.refreshContainerCss();
        that.refreshComponentCss();

        that._setCss(that.$viewComponent, that.options.componentCss);
        that._setCss(that.$viewContainer, that.options.containerCss);

        that._setCss(that.$component, that.options.componentCss);
        that._setCss(that.$wrapper, that.getScaleContainerCss());
    },
    setXYWH: function (data) {
        var that = this;
        $.extend(that.options, data);

        that._setCss(that.$viewComponent, that.options.componentCss);
        that._setCss(that.$viewContainer, that.options.containerCss);

        that._setCss(that.$component, that.options.componentCss);
        that._setCss(that.$wrapper, that.getScaleContainerCss());
    },
    setAnimateIn: function (data) {
        this.options.animateIn = $.extend({}, data);
    },
    setAnimateOut: function (data) {
        this.options.animateOut = $.extend({}, data);
    }
});