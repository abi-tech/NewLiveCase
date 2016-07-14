mainModule.controller('mainController', [ '$rootScope', 'pageService', function ($rootScope, pageService) {  
	//原始 宽 高 缩放比例
    $rootScope.originWidth = 640;
    $rootScope.originHeight = 1040;
    $rootScope.originScale = 1;

    //编辑区 宽 高 缩放比例
    $rootScope.editorWidth = 384;
    $rootScope.editorHeight = 624;
    $rootScope.editorScale = 0.6;

    //管理各区动态生成的Scope
    $rootScope.navigationArea = {};
    $rootScope.navigationArea.scopes = [];

    $rootScope.previewArea = {};
    $rootScope.previewArea.scopes = [];

    $rootScope.editorArea = {};
    $rootScope.editorArea.scopesr = [];

    $rootScope.configArea = {};
    $rootScope.configArea.scopes = [];

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
    }

    $rootScope.setCurrentPage(0, pageService.pages[0]);

}]); 