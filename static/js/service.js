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
        },

        getCurrentPage: function (argument) {
            return this.pages[this.currentPageIndex];
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