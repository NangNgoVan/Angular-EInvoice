function loginController($q, $state, $rootScope, authService, notification, constantService, accountService, cacheService, headerService) {
    var ctrl = this;
    ctrl.loading = false;
    // ctrl.account = {
    //     userName: 'admin',
    //     password: 'Admin@123'
    // };
    ctrl.accInfo = {};

    ctrl.login = function () {
        if (!$('#frmLogin').valid())
            return;

        ctrl.loading = true;
        authService.login(ctrl.account).then(function (response) {
            if (response.status === 200) {
                // $q.all([authService.setToken(response.data), accountService.removeAccountInfo(), accountService.requestAccountInfo(), headerService.getAdminMenus()]).then(function () {
                //     $state.go('invoice-search');
                // });

                $q.all([authService.saveUser(response.data)]).then(function () {
                    $rootScope.$broadcast('logged-in');
                    $state.go('invoice-search');
                });

                // authService.setToken(response.data);
                // accountService.removeAccountInfo();
                // accountService.requestAccountInfo();
                // headerService.removeMenu();
                // headerService.getMenu();
                // $state.go(constantService.state['dashboard']);
                // location.reload();
                // $state.go('dashboard');
            }
            ctrl.loading = false;
        }, function (response) {
            notification.error(response.data || response.statusText);
        });
    };

    ctrl.$onInit = function(){
       if(authService.loggedIn()) {
           $rootScope.$broadcast('logged-in');
           $state.go('invoice-search');
       }
    }
};

angular
    .module('common.auth')
    .controller('loginController', loginController);

loginController.$inject = ['$q', '$state', '$rootScope','authService', 'notification', 'constantService', 'accountService', 'cacheService', 'headerService'];