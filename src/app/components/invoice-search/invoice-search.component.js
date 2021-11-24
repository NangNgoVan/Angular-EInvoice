var uiInvoiceSearch = {
    templateUrl: './invoice-search.template.html',
    controller: 'invoiceSearchController'
};

angular.module('components')
    .component('uiInvoiceSearch', uiInvoiceSearch)
    .config(function ($stateProvider) {
        $stateProvider.state('invoice-search', {
            url: '/invoice-search',
            component: 'uiInvoiceSearch',
            resolve: {
            	checkAuth: function($state, authService, $location) {
            		// console.log(authService.user);
            		if(!authService.user) $location.path('/auth/login');
            	}
            }
        });
    });