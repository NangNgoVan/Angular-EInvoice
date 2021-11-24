function ngNumberOnly() {
    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
            if (angular.isDefined(attrs.ngDecimal)) {
                $(element).number(true, attrs.ngDecimal, ".", ",");
            } else {
                $(element).number(true, 0, ".", ",");
            }
        }
    };
};

angular.module('common').directive('ngNumberOnly', ngNumberOnly);