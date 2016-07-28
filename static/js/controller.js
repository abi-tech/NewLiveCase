mainModule.controller('mainController', [ '$rootScope', 'pageService', 'editorService',
    function ($rootScope, pageService, editorService) {

    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == "$apply" || phase == "$digest") {
            if (fn && (typeof(fn) === "function")) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.pages = pageService.pages;

    $rootScope.setCurrentPage = function(index, page){
        $rootScope.safeApply(function(){
            $rootScope.currentIndex = index; 
            $rootScope.currentPage = page; 
            $rootScope.currentComponent = null; 
        });
    }

    $rootScope.pageChanged = function (index, page) { console.log("$rootScope.pageChanged", index, page);
        $("#editorFrame .u-comChoose").removeClass("u-comChoose");
        $rootScope.setCurrentPage(index, page);
        $rootScope.$broadcast("page.changed", index, page);
        $("#editorFrame").trigger("onLoad");
    }

    $rootScope.componentChanged = function (component) { console.log("$rootScope.componentChanged", component);
        $("#editorFrame .u-comChoose").removeClass("u-comChoose");
        $rootScope.$apply(function () {
            $rootScope.currentComponent = component;
        });
        $rootScope.$broadcast("component.changed", component);
    }
    
    $rootScope.setCurrentPage(0, pageService.pages[0]);

    $rootScope.$watch("currentComponent.options.x", function (newVal, oldVal) {
        if(newVal == oldVal || !$rootScope.currentComponent) return;

        var scale = $rootScope.currentComponent.scale;
        $rootScope.currentComponent.$html.css("left", (newVal * scale) + "px");
        $rootScope.currentComponent.$view.css("left", newVal + "px");
    })

    $rootScope.$watch("currentComponent.options.y", function (newVal, oldVal) {
        if(newVal == oldVal || !$rootScope.currentComponent) return;

        var scale = $rootScope.currentComponent.scale;
        $rootScope.currentComponent.$html.css("top", (newVal * scale) + "px");
        $rootScope.currentComponent.$view.css("top", newVal + "px");
    })

    $rootScope.$watch("currentComponent.options.width", function (newVal, oldVal) {
        if(newVal == oldVal || !$rootScope.currentComponent) return;

        var scale = $rootScope.currentComponent.scale;
        $rootScope.currentComponent.$html.css("width", (newVal * scale) + "px");
        $rootScope.currentComponent.$view.css("width", newVal + "px");
    })

    $rootScope.$watch("currentComponent.options.height", function (newVal, oldVal) { 
        if(newVal == oldVal || !$rootScope.currentComponent) return;

        var scale = $rootScope.currentComponent.scale;
        $rootScope.currentComponent.$html.css("height", (newVal * scale) + "px");
        $rootScope.currentComponent.$view.css("height", newVal + "px");
    })

    $(document).on("keyup", function (e) {
        switch(e.keyCode){
            case 46: alert("delete"); break;
        }
    })
}]);