function argumentNames(fn) {
    var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
}


var ExClass = function (baseClass, prop) {
    // 只接受一个参数的情况 - jClass(prop)
    if (typeof (baseClass) === "object") {
        prop = baseClass;
        baseClass = null;
    }

    // 本次调用所创建的类（构造函数）
    function F() {
        // 如果父类存在，则实例对象的baseprototype指向父类的原型
        // 这就提供了在实例对象中调用父类方法的途径
        if (baseClass) {
            this.baseprototype = baseClass.prototype;
        }
        this.initialize.apply(this, arguments);
    }

    // 如果此类需要从其它类扩展
    if (baseClass) {
        var middleClass = function() {};
        middleClass.prototype = baseClass.prototype;
        F.prototype = new middleClass();
        F.prototype.constructor = F;
    }

    // 覆盖父类的同名函数
    for (var name in prop) {
        if (prop.hasOwnProperty(name)) {
            // 如果此类继承自父类baseClass并且父类原型中存在同名函数name
            if (baseClass &&
                typeof (prop[name]) === "function" &&
                argumentNames(prop[name])[0] === "$super") {
                // 重定义子类的原型方法prop[name]
                // - 这里面有很多JavaScript方面的技巧，如果阅读有困难的话，可以参阅我前面关于JavaScript Tips and Tricks的系列文章
                // - 比如$super封装了父类方法的调用，但是调用时的上下文指针要指向当前子类的实例对象
                // - 将$super作为方法调用的第一个参数
                F.prototype[name] = (function(name, fn) {
                    return function() {
                        var that = this;
                        $super = function() {
                            return baseClass.prototype[name].apply(that, arguments);
                        };
                        return fn.apply(this, Array.prototype.concat.apply($super, arguments));
                    };
                })(name, prop[name]);
                
            } else {
                F.prototype[name] = prop[name];
            }
        }
    }

    return F;
};

var H5ComponentBase = ExClass({
    initialize: function(options) {
        var that = this;
        var defaultOptions = {
            mode: '1', // 设计 1 显示 2
            type: 'base',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            zIndex: 10000,
            rotate: 0,
            center: true,
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
            animateIn: null,
            animateOut: null,
            onChosenEnd: function(){},
            onDragEnd: function(){},
            onResizeEnd: function(){}
        }

        that.id = ('h5_c_' + Math.random()).replace('.', '_');

        that.wrapperTemplate = [
            '<div class="f-abs c-c-container" data-id=' + that.id + ' style="cursor: move" ng-style="component.containerCss">',
                '<div class="tl-c"></div><div class="tr-c"></div><div class="bl-c"></div><div class="br-c"></div>',
            '</div>'
        ].join('');

        that.containerTemplate = '<div class="h5_component"></div>';
        //wrapper 在设计模式下加载 用于组件的 位置 宽高 大小 控制
        //container 在显示模式下设置 
        //component 控制组件的外观
        //inner 控制组件的内容

        that.options = $.extend(true, {}, defaultOptions, options);
        //console.log(that.options);
        //$.extend(that, that.options);

        that._build();
    },
    _setCss: function () {
        var that = this;
        // that.setZIndex(that.zIndex);
        // that.setBackgroundColor(that.options.componentCss["background-color"]);
        // that.setBorderWidth(that.options.componentCss["border-width"]);
        // that.setBorderColor(that.options.componentCss["border-color"]);
        // that.setBorderRadius(that.options.componentCss["border-radius"]);
        // that.setOpacity(that.options.componentCss["opacity"]);
        // that.setRotate(that.options.componentCss["transform"]);
        // that.setWidth(that.options.width);
        // that.setHeight(that.options.height);
        // that.setX(that.options.x)
        // that.setY(that.options.y);
    },
    setContainerCss: function (css) {
        var that = this;
        for(var key in css){
            that.$html.css(key, css[key]);
        }
    },
    setComponentCss: function (css) {
        var that = this;
        for(var key in css){
            that.$component.css(key, css[key]);
        }
    },
    setInnerCss: function (css) {
        var that = this;
        for(var key in css){
            that.$inner.css(key, css[key]);
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
    setX: function (x) {
        //设置x
        this.x = x;
        this.options.containerCss["left"] = this._scale(x);
        this.$wrapper.css("left", this._scale(x));
    },
    setY: function (y) {
        //设置y
        this.y = y;
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
    modeView: function () {
        var that = this;
        that.options.containerCss["width"] = that.options.width;
        that.options.containerCss["height"] = that.options.height;
        that.options.containerCss["top"] = that.options.y;
        that.options.containerCss["left"] = that.options.x;

        that.$wrapper = that.$container = $(that.containerTemplate);
        that.$container.addClass("c-" + that.options.type);
        that.$container.css("position", "absolute");
        that.$container.append(that.$component);

        that.$html = that.$container;
        that._setCss();

        that.setContainerCss(that.options.containerCss);
        that.setComponentCss(that.options.componentCss);
        that.setInnerCss(that.options.innerCss);

        return that.$html.clone();
    },
    modeDesign: function () {
        var that = this;
        that.options.containerCss["width"] = that._scale(that.options.width);
        that.options.containerCss["height"] = that._scale(that.options.height);
        that.options.containerCss["top"] = that._scale(that.options.y);
        that.options.containerCss["left"] = that._scale(that.options.x);

        that.$wrapper = $(that.wrapperTemplate);
        that.$container = $(that.containerTemplate);

        that.$container.append(that.$component);
        that.$wrapper.prepend(that.$container);
        that.$html = that.$wrapper;
        that.interact = interact(that.$html[0], { styleCursor: false });
        that._setCss();
        that._bind();

        that.setContainerCss(that.options.containerCss);
        that.setComponentCss(that.options.componentCss);
        that.setInnerCss(that.options.innerCss);

        that.chosen();

        return that.$html.clone();
    },
    _build: function() {
        var that = this;
        if(that.options.mode === '1'){
            that.modeDesign();
        }else{
            that.modeView();
        }

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
        that._resizeend();
        that._actionChecker();

        that.$html.on('click', function (event) { console.log("component clicked!");
            event.stopPropagation()
            that.chosen();
        });

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

                that.options.x = x / that.options.scale;
                that.options.y = y / that.options.scale;

                //TODO 移动时修改 top left
                if(typeof that.onDragEnd === 'function')
                    that.onDragEnd(that.$html, that.options.x, that.options.y);
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

            that.options.x = x / that.options.scale;
            that.options.y = y / that.options.scale;
            that.options.width = w / that.options.scale;
            that.options.height = h / that.options.scale;

            //TODO 移动时修改 top left width height
            if(typeof that.onResizeEnd === 'function')
                that.onResizeEnd(that.$html, that.options.x, that.options.y, that.options.width, that.options.height);
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
    }
});