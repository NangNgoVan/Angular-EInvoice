function accountsController($state, notification, accountService, roleService, invoiceTemplateService, certificateAuthenticationService, permissionService, CONST_Permission) {
    var ctrl = this;
    ctrl.state = $state;
    ctrl.loading = false;
    ctrl.paging = {
        page: 1,
        size: 10,
    };
    ctrl.sizes = [10, 20, 50, 100];
    ctrl.accounts = [];

    ctrl.getAccounts = function () {
        ctrl.loading = true;
        accountService.paging(ctrl.paging).then(function (response) {
            if (response.status === 200) {
                ctrl.accounts = response.data;
                ctrl.totalItems = response.headers('x-total-items');
            };
            ctrl.loading = false;
        });
    };

    ctrl.add = function () {
        $state.go('account.add');
    };

    ctrl.remove = function (index) {
        if (confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
            ctrl.loading = true;
            accountService.delete(ctrl.accounts[index].id).then(function (response) {
                if (response.status === 200) {
                    ctrl.accounts.splice(index, 1);
                    notification.success('Xóa thành công');
                }
                ctrl.loading = false;
            });
        }
    };

    ctrl.edit = function (index) {
        ctrl.account = angular.copy(ctrl.accounts[index]);
        $state.go('account.edit', { id: ctrl.account.id });
    };

    // ctrl.checkPermisson = function(permission){
    //     return permissionService.checkPermisson(CONST_Permission.account, permission);
    // };

    ctrl.$onInit = function () {
        ctrl.getAccounts();
    };
};

angular
    .module('account')
    .controller('accountsController', accountsController)
accountsController.$inject = ['$state', 'notification', 'accountService', 'roleService', 'invoiceTemplateService', 'certificateAuthenticationService', 'permissionService', 'CONST_Permission'];