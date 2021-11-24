function changePasswordController($state, $stateParams, notification, accountService, authService) {
    var ctrl = this;

    ctrl.passwordChange = {};
    ctrl.account = {};

    ctrl.getAccountInfo = function () {
        ctrl.account = authService.user.customers[0];
        ctrl.passwordChange.userName = ctrl.account.email;
    };

    ctrl.changePassword = function () {
        if (!$('#changePass').valid()) {
            return;
        }

        if (ctrl.checkEmpty()) {
            return;
        }

        if (ctrl.checkConfirmPassword()) {
            return;
        }

        ctrl.loading = true;
        accountService.changePassword(ctrl.passwordChange).then(function (response) {
            if (response.status === 200) {
                var data = response.data;
                if(!data.succeeded){
                    notification.error(data.message);
                }
                else {
                  notification.success(data.message);
                  authService.cleanToken();
                  accountService.removeAccountInfo();
                  accountService.removeAccountClaims();
                  $state.go('auth.login');
                }
            }
            ctrl.loading = false;
        });
    };

    ctrl.checkEmpty = function () {
        if (ctrl.passwordChange.password && ctrl.passwordChange.newPassword && ctrl.passwordChange.confirmPassword) {
            return ctrl.isEmpty = false;
        }
        return ctrl.isEmpty = true;
    };

    ctrl.checkConfirmPassword = function () {
        if ((ctrl.passwordChange.newPassword === ctrl.passwordChange.confirmPassword) || ((ctrl.passwordChange.newPassword === '') && (ctrl.passwordChange.confirmPassword === ''))) {
            return ctrl.isDifferentPassword = false;
        }
        else {
            return ctrl.isDifferentPassword = true;
        }
    };

    ctrl.reset = function () {
        ctrl.passwordChange = {};
    };

    ctrl.$onInit = function () {
        if(authService.user == null) {
            $state.go('auth.login');
            return;
        }
        ctrl.reset();
        ctrl.getAccountInfo();
    };
}

angular
    .module('account')
    .controller('changePasswordController', changePasswordController)
changePasswordController.$inject = ['$state', '$stateParams', 'notification', 'accountService', 'authService'];