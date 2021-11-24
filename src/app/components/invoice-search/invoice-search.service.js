function invoiceSearchService(httpService, notification, authService) {
    var api = '/api/portal';

    this.getList = function (organizationCode, paging) {
        return httpService.get(
            '/api/portal/' + organizationCode,
            { params: paging },
            {
                headers: {
                    // 'Authorization': 'Bearer ' + authService.objToken.token,
                    'Content-Type': 'application/json'
                }
            }
        );
    };

    this.getListByCustomers = function (params) {
        return httpService.get(
            '/api/portal',
            { params: params },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    
    this.exportXml = function (taxCode, id) {
        return httpService.get(api + '/' + taxCode + '/export-xml/' + id);
    };

    this.print = function (taxCode, id) {
        return httpService.get(api + '/' + taxCode + '/print/' + id, { responseType: 'blob' });
    };

    this.getAccount = function (organizationCode, id){
        return httpService.get(api + '/' + organizationCode + '/account/' + id);
    };
};

angular
    .module('components')
    .service('invoiceSearchService', invoiceSearchService);
invoiceSearchService.$inject = ['httpService', 'notification', 'authService'];