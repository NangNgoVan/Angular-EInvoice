

function footerController(cacheService, accountService,) {
    var ctrl = this;
    ctrl.footer = false;
    ctrl.token = cacheService.get('token');

    ctrl.$onInit = function () {
        
        ctrl.footer = true;

        if (!ctrl.token) {
            ctrl.footer = false;
        }
        accountService.addOnAfterSetAccountInfo(function () {
            ctrl.footer = true;
        });
        accountService.addOnAfterRemoveAccountInfo(function () {
            ctrl.footer = false;
        });
        
    };
};

angular
    .module('common')
    .controller('footerController', footerController);
footerController.$inject = ['cacheService', 'accountService'];