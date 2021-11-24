function cacheService(diStoreFactory) {
    this.keys = [
        'invoice-types',
        'invoice-templates',
        'invoice-statuses',
        'active-statuses',
        'sign-statuses',
        'payment-statuses',
        'products',
        'units',
        'taxes'
    ];

    this.get = function (name) {
        return diStoreFactory.get(name);
    };

    this.set = function (name, value) {
        diStoreFactory.set(name, value);
    };

    this.remove = function (name) {
        diStoreFactory.remove(name);
    };

    this.clean = function() {
        this.keys.forEach(function(element) {
            diStoreFactory.remove(element);
        }, this);
    };
};

angular
    .module('services')
    .service('cacheService', cacheService);
cacheService.$inject = ['diStoreFactory'];