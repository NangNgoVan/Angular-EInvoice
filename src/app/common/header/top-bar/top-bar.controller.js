function topBarController($scope, $timeout, $state, $stateParams, authService, accountService, headerService) {
    var ctrl = this;
    ctrl.state = $state;
    ctrl.stateParams = $stateParams;
    ctrl.isUser = false;

    ctrl.logout = function () {
        authService.logout();
        ctrl.accountInfo = null;
        $state.go('dashboard');
    };

    ctrl.$onInit = function () {
       if (authService.loggedIn()) {
            ctrl.accountInfo = authService.user.customers[0];
       }
    };

    $scope.$on('logged-in', function(event) {        
        ctrl.accountInfo = authService.user.customers[0];
    });
};

angular.module('common')
    .controller('topBarController', topBarController);
topBarController.$inject = ['$scope', '$timeout', '$state', '$stateParams', 'authService', 'accountService', 'headerService'];