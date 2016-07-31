mainModule.directive("confSingleimage", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: 'A',
        template: '<div></div>',
        replaceWith: true,
        link: function (scope, element, attrs) {
            var cfg = $rootScope.currentComponent.options;
            var data = {
                url: null,
                width: 0,
                height: 0,
                marginTop: 0,
                marginLeft: 0,
                aspectRatio: "NaN",
            }

            for(var key in data){
                if(cfg[key])
                    data[key] = cfg[key];
            }

            var confSingleimage = new ConfSingleimage({
                data: data,
                onChange: function (data) { 
                    $.extend($rootScope.currentComponent.options, data);
                    $rootScope.$apply(); console.log($rootScope.currentComponent.options, data);
                    $rootScope.currentComponent.refresh();
                }
            });
            element.replaceWith(confSingleimage.$html);

            scope.$on("$destroy", function() {
                console.log("confSingleimage销毁");
            });
        }
    }
}]);

mainModule.directive("confSingletext", ['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: 'A',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var cfg = $rootScope.currentComponent.options;
            var data = {
                text: null,
                fontSize: null,
                fontColor: null,
                textAlign: null,
                lineHeight: null,
                fontFamily: null,
                fontWeight: null,
                fontStyle: null,
                textDecoration: null
            }

            for(var key in data){
                if(cfg[key])
                    data[key] = cfg[key];
            }

            var confSingletext = new ConfSingletext({
                data: data,
                onChange: function (data) { 
                    $.extend($rootScope.currentComponent.options, data);
                    $rootScope.$apply();
                    $rootScope.currentComponent.refresh();
                }
            });
            element.replaceWith(confSingletext.$html);

            //scope
        }
    }
}]);

mainModule.directive('confExternallinks',['$rootScope', '$compile', 'pageService', function ($rootScope, $compile, pageService) {
    return {
        restrict: 'A',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var cfg = $rootScope.currentComponent.options;
            var data = {
                funType: null,
                funMode: null,
                address: null,
                phone: null,
                layer: null,
                link: null,
                pageSize: 1,
                text: null,
                icon: null,
                fontSize: null,
                fontColor: null,
                textAlign: null,
                fontWeight: null,
                fontStyle: null,
                textDecoration: null
            }

            for(var key in data){
                if(cfg[key])
                    data[key] = cfg[key];
            }

            var confExternallinks = new ConfExternallinks({
                data: data,
                onChange: function (data) {
                    $.extend($rootScope.currentComponent.options, data);
                    $rootScope.$apply();
                    $rootScope.currentComponent.initFunType();
                }
            });

            element.replaceWith(confExternallinks.$html);
        }
    };
}]);