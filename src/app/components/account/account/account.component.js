var uiAccount = {
    templateUrl: './account.template.html',
    controller: 'accountController'
};

angular
    .module('account')
    .component('uiAccount', uiAccount)
    .config(function ($stateProvider) {
        $stateProvider
            .state('account.add', {
                url: '/add',
                component: 'uiAccount',
            })
            .state('account.edit', {
                url: '/edit/:id',
                component: 'uiAccount',
                params: {
                    id: null
                }
            });
    });