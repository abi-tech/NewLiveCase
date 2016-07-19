//<div class="f-float-r flag icon-x40-flag-off"></div>
//<div class="f-float-r flag icon-x40-flag-on"></div>

mainModule.directive("inputSwitcher", [ "$log", function ($log) {
    return {
        restrict: "A",
        template: '<div class="f-float-r flag" ng-click="change()"></div>',
        replace: true,
        require: "ngModel",
        scope: {
        	status: '=' 
        },
        link: function (scope, element, attrs, ngModelController) {
        	scope.change = function() {
        		ngModelController.$setViewValue(!ngModelController.$viewValue);
        		ngModelController.$render();
        	}
        	ngModelController.$render = function () {
        		var viewValue = ngModelController.$viewValue;
        		element.removeClass(viewValue? "icon-x40-flag-off" : "icon-x40-flag-on");
        		element.addClass(viewValue? "icon-x40-flag-on" : "icon-x40-flag-off");
        		$log.debug("this is inputSwitcher");
        	}
        }
    }
}]);

mainModule.directive("inputWrapper", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: "A",
        template: "",
        transclude: true,
        replace: true,
        link: function (scope, element, attrs) {

        }
    }
}]);