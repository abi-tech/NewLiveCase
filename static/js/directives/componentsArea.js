var tpl_components = [
'<li class="c-com f-cur-point" draggable="true">',
	'{{ if isNeedVip }}',
	'<div class="vip-label common-state-vip"></div>',
	'{{ /if }}',
	'<a href="javascript:void(0);" class="com-icon">',
		'<div><img src="{{ icon }}"></div>',
	'</a>',
	'<p class="com-name">{{ name }}</p>',
	'<div class="com-title">',
		'<h2>{{ name }}</h2>',
		'<small>{{ tip }}</small>',
	'</div>',
	'{{ if isNew }}',
	'<i class="newcomtip"></i>',
	'{{ /if }}',
'</li>'
].join('');

mainModule.directive("componentsArea", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        templateUrl: "tpls/componentsArea.html",
        replace: true,
        link: function (scope, element, attrs) {
        	var components = constants.componentsArea.components;
        	var comlist = $(".c-com-list", element);

        	function initView(){
        		angular.forEach(components, function (data, index, array) {
        			var html = template.compile(tpl_components)(data);
        			comlist.append(html);
        		});
        		
        	}
        	initView();
        }
    }
}]);