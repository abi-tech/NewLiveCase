mainModule.controller('mainController', [ '$rootScope', 'pageService', function ($rootScope, pageService) {

    $rootScope.calcScale = function () {
        var originHeight = 1040;
        var editorHeight = 624;
        var editorScale = 0.6;
        var tempHeight = $(window).height() - 120 - 40;
        if (tempHeight < editorHeight) {
            editorScale = tempHeight / originHeight;
        }
        constants.scale = editorScale;
    }

    $rootScope.calcScale();

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

    $rootScope.pageChanged = function (index, page) { //console.log("$rootScope.pageChanged", index, page);
        $("#editorFrame .u-comChoose").removeClass("u-comChoose");
        $rootScope.setCurrentPage(index, page);
        $rootScope.$broadcast("page.changed", index, page);  //console.log("$rootScope.pageChanged");
        //$("#editorFrame").trigger("onLoad");
    }

    $rootScope.componentChanged = function (component) { //console.log("$rootScope.componentChanged", component);
        $("#editorFrame .u-comChoose").removeClass("u-comChoose");
        $rootScope.safeApply(function () {
            $rootScope.currentComponent = component;
        });
        $rootScope.$broadcast("component.changed", component);
    }

    $rootScope.deleteCurrentComponent = function () {
         $rootScope.safeApply(function () {
             var hasIndex = -1;
            for (var i = 0; i < $rootScope.currentPage.components.length; i++) {
                var component = $rootScope.currentPage.components[i];
                if($rootScope.currentComponent.id === component.id){
                    hasIndex = i;
                    break;
                }
            }
            if(hasIndex != -1){
                $rootScope.currentComponent.$view.remove();
                $rootScope.currentComponent.$html.remove();
                $rootScope.currentPage.components.splice(hasIndex, 1);
            }
         });
    }
    
    $rootScope.setCurrentPage(0, pageService.pages[0]);

    $(document).on("keyup", function (e) {
        switch(e.keyCode){
            case 46: alert("delete"); break;
        }
    })
}]);