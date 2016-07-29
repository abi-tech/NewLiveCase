var H5ComponentBase = ExClass({
    initialize: function(options) {
        var that = this;
        var defaultOptions = {
            mode: '1', // 设计 1 显示 2
            type: 'base',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            center: false,
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
            '<div class="f-abs c-c-container" data-id=' + that.id + ' style="cursor: move" ng-click="click(component, $event)">',
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
    animate: function(animation) {
        //表演动画
        var that = this;
        if(!animation) return;

        var express = animation.effect + " " + animation.duration + "s";
        var end = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        that.$container.css("animation", express).one(end, function () {
            that.$container.css("animation", "none");
        });
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
    buildView: function () {
        var that = this;

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

        var containerCss = $.extend({}, that.options.containerCss);
        containerCss["top"] = that.options.top;
        containerCss["left"] = that.options.left;
        containerCss["width"] = that.options.width;
        containerCss["height"] = that.options.height;
        that._setCss(that.$viewContainer, containerCss);
        that._setCss(that.$viewComponent, that.options.componentCss);
        that._setCss(that.$viewInner, that.options.innerCss); //console.log("h5", that.$viewInner);
    },
    buildHtml: function () {
        var that = this;
        that.options.containerCss["top"] = that._scale(that.options.top);
        that.options.containerCss["left"] = that._scale(that.options.left);
        that.options.containerCss["width"] = that._scale(that.options.width);
        that.options.containerCss["height"] = that._scale(that.options.height);

        that.$wrapper = $(that.wrapperTemplate);
        that.$container = $(that.containerTemplate);
        that.$inner = $(that.innerTemplate);
        
        that.$component.append(that.$inner);
        that.$container.append(that.$component);
        that.$wrapper.prepend(that.$container);
        that.$html = that.$wrapper;
        that.interact = interact(that.$html[0], { styleCursor: false });
        that._bind();
        that._setCss(that.$wrapper, that.options.containerCss);
        that._setCss(that.$component, that.options.componentCss);
        that._setCss(that.$inner, that.options.innerCss);

        that.chosen();

        return that.$html.clone();
    },
    _build: function() {
        var that = this;
        
        that.buildView();
        that.buildHtml();

        that.$container.on('onLoad',function(){
            that.animate(that.options.animateIn);
            return false;   // 阻止事件向上传播         
        });
        that.$container.on('onLeave',function(){
            that.animate(that.options.animateOut);
            return false;   // 阻止事件向上传播             
        });

        that.$container.trigger('onLoad');
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
        that.interact.on('dragend', function(event){
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
    setXYWH: function (data) {
        var left = parseInt(data["left"]);
        var top = parseInt(data["top"]);
        var width = parseInt(data["width"]);
        var height = parseInt(data["height"]);
        var scale = that.scale;

        that.options.containerCss["left"] = left;
        that.options.containerCss["top"] = top;
        that.options.containerCss["width"] = width;
        that.options.containerCss["height"] = height;
        
        that.containerCss["left"] = left;
        that.containerCss["top"] = top;
        that.containerCss["width"] = width;
        that.containerCss["height"] = height;

        that.left = left;
        that.top = top;
        that.width = width;
        that.height = height;

        $("#left").val(left);
        $("#top").val(top);
        $("#width").val(width);
        $("#height").val(height);

        that.$html.css("left", left * that.scale);
        that.$html.css("top", top * that.scale);
        that.$html.css("width", width * that.scale);
        that.$html.css("height", height * that.scale);

        that.$view.css("left", left);
        that.$view.css("top", top);
        that.$view.css("width", width);
        that.$view.css("height", height);
    },
    setComponentCss: function (data) {
        var that = this;

        that.options.componentCss["background-color"] = data["backgroundColor"];
        that.options.componentCss["border-width"] = data["borderWidth"];
        that.options.componentCss["border-color"] = data["borderColor"];
        that.options.componentCss["border-radius"] = data["borderRadius"];
        that.options.componentCss["opacity"] = parseInt(data["opacity"]) / 100;
        that.options.componentCss["transform"] = "rotate(" + data["rotate"] + "deg)";
        that.options.containerCss["transform"] = "rotate(" + data["rotate"] + "deg)";

        that._setCss(that.$view, componentCss);
        that._setCss(that.$view, containerCss);

        that._setCss(that.$html, componentCss);
        that._setCss(that.$html, containerCss);
    }
});