function constantService($q, httpService, cacheService) {
    var url = '/constants';

    this.activeStatuses = {
        Active: true,
        InActive: false
    };

    this.state = {
        // 'home|component': 'component.dashboard',
        // 'invoice-intro|get': 'component.invoice-intro',

        'home|admin': 'admin.dashboard',
        'invoice-intro|get': 'admin.account',
        'company|get': 'admin.company',
        'role|get': 'admin.role',
        'setting|get': 'admin.setting',
        'taxdepartment|get': 'admin.tax-department',
        'usbtoken|get': 'admin.certificate-authentication',
        'currency|get': 'admin.currency',
        'customer|get': 'admin.customer',
        // 'groupcustomer|get': 'admin.group-customer',
        'product|get': 'admin.product',
        'producttype|get': 'admin.productType',
        'tax|get': 'admin.tax',
        'unit|get': 'admin.unit',
        'invoicetemplate|get': 'admin.invoice-template',
        'invoicetype|get': 'admin.invoice-type',
        // 'pattern|get': 'admin.list-pattern',
        'registerinvoice|get': 'admin.invoice-register',

        'home|user': 'user.dashboard',
        'invoice|get': 'user.invoices.list',
        'invoice|approval': 'user.invoices.approval',
        'invoice|create': 'user.invoices.select-template',
        'bc26|get': 'user.init-bc26',
        'invoice|cancel': 'user.invoices.cancel'
    };

    this.getCitydisctrict = function (paging) {
        return httpService.get('/api/city-disctrict', { params: paging });
    };

    this.getWards = function () {
        return httpService.get('/api/wards/' + id);
    };

    this.getInvoiceStatuses = function () {
        var cacheKey = 'invoice-statuses'
        var deferred = $q.defer();
        var data = cacheService.get(cacheKey);
        if (data) {
            deferred.resolve({ data: data });
            return deferred.promise;
        }

        return httpService.get(url + '/invoie-statuses').then(function (response) {
            if (response.status === 200) {
                cacheService.set(cacheKey, response.data);
                return response.data;
            }
        });
    };

    this.getActiveStatuses = function () {
        var cacheKey = 'active-statuses'
        var deferred = $q.defer();
        var data = cacheService.get(cacheKey);
        if (data) {
            deferred.resolve({ data: data });
            return deferred.promise;
        }

        return httpService.get(url + '/active-statuses').then(function (response) {
            if (response.status === 200) {
                cacheService.set(cacheKey, response.data);
                return response;
            }
        });
    };

    this.getSignStatuses = function () {
        var cacheKey = 'sign-statuses'
        var deferred = $q.defer();
        var data = cacheService.get(cacheKey);
        if (data) {
            deferred.resolve({ data: data });
            return deferred.promise;
        }

        return httpService.get(url + '/sign-statuses').then(function (response) {
            if (response.status === 200) {
                cacheService.set(cacheKey, response.data);
                return response;
            }
        });
    };

    this.getPaymentMethods = function () {
        var cacheKey = 'payment-statuses';
        var deferred = $q.defer();
        var data = cacheService.get(cacheKey);
        if (data) {
            deferred.resolve({ data: data });
            return deferred.promise;
        }

        return httpService.get(url + '/payment-methods').then(function (response) {
            if (response.status === 200) {
                cacheService.set(cacheKey, response.data);
                return response;
            }
        });
    };
};

angular
    .module('services')
    .service('constantService', constantService);
constantService.$inject = ['$q', 'httpService', 'cacheService'];