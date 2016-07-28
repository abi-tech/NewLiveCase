/**
* 描述：用于表示H5页面
* 功能：添加组件 移除组件 设置组件位置
* { "type": "", "name": "缩放", "effect": "a_slideZoom_bottomIn", "duration": 0.5, "delay": 0 }
* { "type": "", "name": "缩放", "effect": "a_slide_bottomIn", "duration": 0.5, "delay": 0 }
* { "type": "", "name": "缩放", "effect": "a_fadeIn_bottomIn", "duration": 0.5, "delay": 0 }
* { "type": "", "name": "缩放", "effect": "a_rotate_bottomIn", "duration": 0.5, "delay": 0 }
* { "type": "", "name": "缩放", "effect": "a_xSlide_rightIn", "duration": 0.5, "delay": 0 }
**/
var H5Page = function(options) {
    var that = this;

    //默认参数
    that.defaultOptions = {
        type: "page",
        width: 640,
        height: 1040,
        bgColor: "rgb(255, 255, 255)",
        bgImage: "",
        css: {
            "background-color": "rgb(255, 255, 255)",
            "background-image": "none"
        },
        active: false,
        slideIcon: null,
        animation: null,
        applyAllPages: false,
        autoTurnPage: false,
        autoTurnPageDelay: 0,
        lockTurnPage: false,
        zIndex: 10000,
        step: 100,
        components: []
    };

    /**
    * 描述：添加H5组件
    * 参数 component H5组件对象
    **/
    that.add = function(component) {
        var zIndex = that.zIndex + (that.step * (that.components.length + 1));
        component.setZIndex(zIndex);
        that.components.push(component);
        that.currentComponent = component;
    }

    /**
    * 描述：移至顶层
    **/
    that.moveTop = function (index) {
        var component = that.components[index];
        that.components.splice(index, 1);
        that.components.push(component);
    }

    /**
    * 描述：移至底层
    **/
    that.moveBottom = function (index) {
        var component = that.components[index];
        that.components.splice(index, 1);
        that.components.splice(0, 0, component);
    }

    /**
    * 描述：上移一层
    **/
    that.moveUp = function (index) {
        if(index >= that.components.length - 1) return;
        swap(that.components, index, index + 1);
    }

    /**
    * 描述：下移一层 
    **/
    that.moveDown = function (index) {
        if(index == 0) return;
        swap(that.components, index, index - 1);
    }

    /**
    * 描述：移除H5组件
    **/
    that.remove = function (index) {
        if(index < 0 || index >= that.components.length) return;
        that.components.splice(index, 1);
    }

    /**
    * 描述：获取当前对象的options
    **/
    that.getOptions = function() {
        var obj = $.parseJSON(JSON.stringify(that));
        delete obj.defaultOptions;
        delete obj.currentComponent;
        delete obj.options;
        return obj;
    }

    /**
    * 描述：设置当前对象的options
    **/
    that.setOptions = function (options) {
        delete that.options;
        that.currentComponent = null;
        that.defaultOptions.slideIcon = constants.pageIconList[0];
        that.defaultOptions.animation = constants.pageAnimationList[0];
        that.options = $.extend({}, that.defaultOptions, options);
        $.extend(that, that.options);
    }

    that.animate = function (animation) {
        // body...
    }

    /**
    * 描述：交换数组中索引位置的元素
    * 参数：
    *       arr 需要交换元素的数组
    *       index1 交换位置的索引
    *       index2 交换位置的索引
    **/
    function swap(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    //初始参数
    that.setOptions(options);
}
