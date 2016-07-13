mainModule.service('pageService', ['$rootScope', function (rootScope) {

	var service = {
        currentIndex: 0,
		pages:[{ 
            style: { "background-color": "#ffffff", "background-image": "none"},
            animation: { "type": "", "name": "缩放", "effect": "slideZoomIn", "duration": 1, "delay": 0 },
            turnPage: { "id": "3", "name": "DownArrow", "url": "static/images/slideDown.png" },
            slideIcon: "static/images/slideDown.png",
            applyAllPages: true,
            autoTurnPage: true,
            autoTurnPageDelay: 0,
            lockTurnPage: true,
            components: []
        }, { 
            style: { "background-color": "#ffffff", "background-image": "none"},
            animation: { "type": "", "name": "缩放", "effect": "slideZoomIn", "duration": 1, "delay": 0 },
            turnPage: { "id": "3", "name": "DownArrow", "url": "static/images/slideDown.png" },
            slideIcon: "static/images/slideDown.png",
            applyAllPages: true,
            autoTurnPage: true,
            autoTurnPageDelay: 0,
            lockTurnPage: true,
            components: []
        }],

		get: function (index) {
            return service.pages[index];
        },

        add: function (index, page) {
            if(!page) { 
                page = { 
                    style: { "background-color": "#ffffff", "background-image": "none"},
                    animation: { "name": "缩放", "effect": "slideZoomIn", "duration": 1, "delay": 0 },
                    turnPage: { "id": "1", "name": "LiveApp", "url": "static/images/upArrow.png" },
                    slideIcon: "static/images/slideDown.png",
                    applyAllPages: false,
                    autoTurnPage: false,
                    autoTurnPageDelay: 0,
                    lockTurnPage: false,
                    components: []
                }
            }
            service.pages.splice(index, 0, page);
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