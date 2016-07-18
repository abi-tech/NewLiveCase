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
        bgColor: "",
        bgImage: "",
        css: null,
        slider: "slide-page-icon-default",
        animation: { "type": "", "name": "缩放", "effect": "a_slideZoom_bottomIn", "duration": 0.5, "delay": 0 },
        applyAllPages: true,
        autoTurnPage: true,
        autoTurnPageDelay: 0,
        lockTurnPage: true,
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

mainModule.service('pageService', ['$http', function ($http) {

	var service = {
        currentPageIndex: 0,
        currentComponent: null,
		pages:[new H5Page()],

		get: function (index) {
            return service.pages[index];
        },

        add: function (index, page) {
            service.pages.splice(index, 0, new H5Page());
        },

        delete: function(index){
            if(index < 0) return;
            if(index > service.pages.length) return;

            service.pages.splice(index, 1);
        },

        copy: function(index){
            var page = angular.fromJson(angular.toJson(service.pages.slice(index, index + 1)[0]));
            for (var i = 0; i < page.components.length; i++) {
                page.components[i].id = (Math.round(Math.random() * 100)) + '';
            }
            service.pages.splice(index, 0, page);
        },

        moveUp: function(index){
            if(index == 0) return;
            swap(service.pages, index, index - 1);
        },

        moveDown: function(index){
            if(index == service.pages.length - 1) return;
            swap(service.pages, index, index + 1);
        }

	};

	function swap(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };
    
	return service;
}]);

//======================================= Common Service ===================================================
mainModule.service('imageService', ['$http', function ($http) {
    var options = {
        type: "image"
    };
    var fileDialog = new FileDialog(options);
    return fileDialog;
}]);

mainModule.service('musicService', ['$http', function ($http) {
    var options = {
        type: "music"
    };
    var fileDialog = new FileDialog(options);
    return fileDialog;
}]);

mainModule.service('editorService', ['$http', 'pageService', function ($http, pageService) {
    var options = {
        page: pageService.pages[0]
    };
    var editor = new H5EditorFrame(options);
    return editor;
}]);