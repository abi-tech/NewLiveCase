mainModule.controller('mainController', [ '$rootScope', 'pageService', function ($rootScope, pageService) {  
	//原始 宽 高 缩放比例
    $rootScope.originWidth = 640;
    $rootScope.originHeight = 1040;
    $rootScope.originScale = 1;

    //编辑区 宽 高 缩放比例
    $rootScope.editorWidth = 384;
    $rootScope.editorHeight = 624;
    $rootScope.editorScale = 0.6;

    $rootScope.currentPage = pageService.get(0);
    $rootScope.currentComponent = null;

    //管理各区动态生成的Scope
    $rootScope.navigationArea = {};
    $rootScope.navigationArea.scopes = [];

    $rootScope.previewArea = {};
    $rootScope.previewArea.scopes = [];

    $rootScope.editorArea = {};
    $rootScope.editorArea.scopesr = [];

    $rootScope.configArea = {};
    $rootScope.configArea.scopes = [];
}]); 