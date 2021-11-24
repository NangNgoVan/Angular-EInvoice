function dashboardService(httpService, notification) {
    var api = '/api/portal';

    this.getInvoice = function (taxCode, id) {
        return httpService.get(api + '/' + taxCode + '/' + id);
    };

    this.exportXml = function (taxCode, id) {
        return httpService.get(api + '/' + taxCode + '/export-xml/' + id);
    };

    this.print = function (taxCode, id) {
        return httpService.get(api + '/' + taxCode + '/print/' + id, { responseType: 'blob' });
    };
};

angular
    .module('components')
    .service('dashboardService', dashboardService);
dashboardService.$inject = ['httpService', 'notification'];