var uiAccounts = {
    templateUrl: './accounts.template.html',
    controller: 'accountsController'
};

angular
    .module('account')
    .component('uiAccounts', uiAccounts)
    .config(function ($stateProvider) {
        $stateProvider.state('account.list', {
            url: '',
            component: 'uiAccounts'
        });
    });