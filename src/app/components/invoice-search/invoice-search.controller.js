function invoiceSearchController($state, notification, invoiceSearchService, printService, cacheService, authService, colorService) {
    var ctrl = this;
    ctrl.loading = false;
    ctrl.invoice = {};
    ctrl.invoices = [];
    ctrl.paging = {
        createBy: null,
        page: 1,
        size: 10
    };
    ctrl.sizes = [10, 20, 50, 100];
    ctrl.account = authService.user;
    ctrl.colorService = colorService;

    ctrl.getAccount = function () {
        ctrl.loading = true;
        return invoiceSearchService.getAccount(ctrl.account.organizationCode, ctrl.account.id).then(function(response){
            if (response.status === 200) {
                ctrl.accountCustomer = response.data;
            }
            ctrl.loading = false;
        });
    };

    // ctrl.getList = function () {
    //     ctrl.loading = true;
    //     return invoiceSearchService.getList(ctrl.account.id, ctrl.paging).then(function (response) {
    //         if (response.status === 200) {
    //             ctrl.invoices = response.data;
    //             ctrl.totalItems = response.headers('x-total-items');              
    //         }
    //         ctrl.loading = false;
    //     });
    // };

    ctrl.getList = function () {
        ctrl.loading = true;
        var params = ctrl.paging;
        params.buyerIds = ctrl.account.customerIds;
        return invoiceSearchService.getListByCustomers(params)
        .then(function (response) {
            if (response.status === 200) {
                ctrl.invoices = response.data;
                ctrl.totalItems = response.headers('x-total-items');
            }
            ctrl.loading = false;
        });
    }

    ctrl.exportXml = function (sellerTaxCode, id) {
        ctrl.loading = true;
        invoiceSearchService.exportXml(sellerTaxCode, id).then(function (response) {
            if (response.status === 200) {
                notification.success("Xuất file xml thành công");
                xmlFileName = response.headers('File-Name');
                printService.saveFile(response.data, xmlFileName);
            }
            ctrl.loading = false;
        });
    };

    ctrl.exportPdf = function (sellerTaxCode, id) {
        ctrl.loading = true;
        invoiceSearchService.print(sellerTaxCode, id).then(function (response) {
            if (response.status === 200) {
                printService.exportPdf(response.data);
            }
            ctrl.loading = false;
        });
    };

    ctrl.reset = function () {
        ctrl.invoice = {};
    };

    ctrl.$onInit = function () {
        ctrl.reset();
        if (ctrl.account) {
            ctrl.getList();
        }
    };

}
angular.module('components')
    .controller('invoiceSearchController', invoiceSearchController);
invoiceSearchController.$inject = ['$state', 'notification', 'invoiceSearchService', 'printService', 'cacheService', 'authService', 'colorService'];