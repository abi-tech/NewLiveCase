mainModule.controller('mainController', [ '$rootScope', 'pageService', 'editorService',
    function ($rootScope, pageService, editorService) {

    $rootScope.pages = pageService.pages;

    $rootScope.createPage = function(index) {  //console.log(index);
        pageService.add(index + 1);
        $rootScope.setCurrentPage(index + 1, pageService.get(index + 1));
    } 

    $rootScope.removePage = function(index) {
        pageService.delete(index);
        $rootScope.setCurrentPage(0);
    } 

    $rootScope.copyPage = function(index) {  
        pageService.copy(index);
        $rootScope.setCurrentPage(index + 1, pageService.pages[index + 1]);
    } 

    $rootScope.moveUp = function(index) {
        pageService.moveUp(index);
    } 

    $rootScope.moveDown = function(index) {
        pageService.moveDown(index);
    } 

    $rootScope.setCurrentPage = function(index, page){
        $rootScope.currentIndex = index; 
        $rootScope.currentPage = page; 
        $rootScope.currentComponent = null;
        //console.log($rootScope.currentPage);
        //$rootScope.$apply();
        editorService.$html.trigger('onLoad');
        $(".u-comChoose", editorService.$html).removeClass("u-comChoose");
    }

    $rootScope.setCurrentPage(0, pageService.pages[0]);

}]);