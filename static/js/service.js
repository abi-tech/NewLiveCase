mainModule.service('pageService', ['$http', function ($http) {

	var service = {
		pages:[new H5Page()],

		get: function (index) {
            return service.pages[index];
        },

        add: function (index) {
            if(!index){
                service.pages.push(new H5Page({ active: true }));
                return;
            }
            service.pages.splice(index, 0, new H5Page({ active: true }));
        },

        delete: function(index){
            if(index < 0) return;
            if(index > service.pages.length) return;

            service.pages.splice(index, 1);
        },

        copy: function(index){
            var page = $.parseJSON(angular.toJson(service.pages.slice(index, index + 1)[0]));
            for (var i = 0; i < page.components.length; i++) {
                var component,
                    options = page.components[i].options;
                switch(options.type){
                    case 'singleimage':
                        component = new Singleimage(options);
                        break;
                    case 'singletext':
                        component = new Singletext(options);
                        break;
                    case 'externallinks':
                        component = new Externallinks(options);
                        break;
                }
                page.components[i] = component;
            }
            service.pages.splice(index, 0, page);
        },

        up: function(index){
            if(index == 0) return;
            swap(service.pages, index, index - 1);
        },

        down: function(index){
            if(index == service.pages.length - 1) return;
            swap(service.pages, index, index + 1);
        },

        deleteComponentById: function (pageIndex, componentId) {
            var hasIndex = -1;
            for (var i = 0; i < this.pages[pageIndex].components.length; i++) {
                var component = this.pages[pageIndex].components[i];
                if(componentId === component.id){
                    hasIndex = i;
                    break;
                }
            }
            if(hasIndex != -1)
                this.pages[pageIndex].components.splice(hasIndex, 1);
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
// mainModule.service('imageService', ['$http', function ($http) {
//     var options = {
//         type: "image"
//     };
//     var fileDialog = new FileDialog(options);
//     return fileDialog;
// }]);

// mainModule.service('musicService', ['$http', function ($http) {
//     var options = {
//         type: "music"
//     };
//     var fileDialog = new FileDialog(options);
//     return fileDialog;
// }]);

// mainModule.service('editorService', ['$http', 'pageService', function ($http, pageService) {
//     var options = {
//         page: pageService.pages[0]
//     };
//     var editor = new EditorFrameBuilder(options);
//     return editor;
// }]);