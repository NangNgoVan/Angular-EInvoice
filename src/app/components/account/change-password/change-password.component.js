var uiChangePassword = {
    templateUrl: './change-password.template.html',
    controller: 'changePasswordController'
};

angular
    .module('account')
    .component('uiChangePassword', uiChangePassword)
    .config(function ($stateProvider) {
        $stateProvider.state('account.changePassword', {
            url: '/change-password',
            component: 'uiChangePassword'
        });
    });