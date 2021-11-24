angular
    .module('account', [])
    .config(function ($stateProvider) {
        $stateProvider.state('account', {
            url: '/account',
            template: '<ui-view></ui-view>',
            redirectTo: 'account.list'
        });
    });
