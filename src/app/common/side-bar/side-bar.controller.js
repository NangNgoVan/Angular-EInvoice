function sideBarController(headerService, cacheService, accountService) {
    var ctrl = this;
    ctrl.items = [];
    ctrl.token = cacheService.get('token');

    ctrl.$onInit = function () {
        // if (ctrl.token)
            ctrl.items = headerService.getAdminMenus();
    };
};

angular
    .module('common')
    .controller('sideBarController', sideBarController);
sideBarController.$inject = ['headerService', 'cacheService', 'accountService'];