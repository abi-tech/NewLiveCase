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

var comUtils = {};

comUtils.animate = function (name, dom, animation, callback) {
    if(dom && animation) {
        var st = new Date().getTime();
        console.log(name + "开始");
        var exp = animation.effect + " " + animation.duration + "s ";
        var end = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        dom.css("animation", exp).one(end, function () {
            dom.css("animation", "none");
            dom.unbind(end);

            var et = new Date().getTime();
            var sp = et - st;
            console.log(name + "结束 耗时:" + sp + "ms");
            callback && callback(dom, animation);
        });
    }
}

comUtils.createPage = function (opts) {
    var h5page = new H5Page(opts);
    $.each(h5page.components, function (i, n) {
        h5page.components[i] = comUtils.createComponent(n);
    });
    return h5page;
}

comUtils.createComponent = function (opts) {
    var component;
    switch(opts.type){
        case 'singleimage':
            component = new Singleimage(opts);
            break;
        case 'singletext':
            component = new Singletext(opts);
            break;
        case 'externallinks':
            component = new Externallinks(opts);
            break;
    }
    return component;
}