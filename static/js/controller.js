mainModule.controller('mainController', [ '$rootScope', 'pageService', 'editorService',
    function ($rootScope, pageService, editorService) {

    $rootScope.pages = pageService.pages;

    $rootScope.setCurrentPage = function(index, page){
        $rootScope.currentIndex = index; 
        $rootScope.currentPage = page; 
        $rootScope.currentComponent = null;
        //console.log($rootScope.currentPage);
        //$rootScope.$apply();
        editorService.$html.trigger('onLoad');
        $(".u-comChoose", editorService.$html).removeClass("u-comChoose");
    }

    $rootScope.pageChanged = function (index) {
        $rootScope.$broadcast("page.changed", index);
    }

    $rootScope.componentChanged = function (component) {
        $rootScope.$broadcast("component.changed", component);
    }
    
    $rootScope.setCurrentPage(0, pageService.pages[0]);

    $(document).on("keyup", function (e) {
        switch(e.keyCode){
            case 46: alert("delete"); break;
        }
    })
}]);