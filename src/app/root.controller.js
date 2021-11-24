function rootController(accountService, authService) {
    var ctrl = this;
    //ctrl.token = authService.getToken();/

    ctrl.$onInit = function () {
        // ctrl.sideBar = true;
        // if (ctrl.token && new Date(ctrl.token.expireOn) < new Date()) {
        //     ctrl.sideBar = false;
        // }
        // if (!ctrl.token) {
        //     ctrl.sideBar = false;
        // }
        // accountService.addOnAfterSetAccountInfo(function () {
        //     ctrl.sideBar = true;
        // });
        // accountService.addOnAfterRemoveAccountInfo(function () {
        //     ctrl.sideBar = false;
        // });
    };
};

angular
    .module('root')
    .controller('rootController', rootController)
rootController.$inject = ['accountService', 'authService'];