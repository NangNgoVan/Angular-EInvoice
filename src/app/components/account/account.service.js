function accountService($q, httpService, cacheService, authService) {
    var api = '/api/customers';
    var cacheKey = 'account-info';
    var cacheClaims = 'claims-info';
    this.accountInfo = null;
    var onAfterSetAccountInfoListeners = [];
    var onAfterRemoveAccountInfoListeners = [];

    this.addOnAfterSetAccountInfo = function (onAfterSetAccountInfo) {
        onAfterSetAccountInfoListeners.push(onAfterSetAccountInfo);
    };

    this.addOnAfterRemoveAccountInfo = function (onAfterRemoveAccountInfo) {
        onAfterRemoveAccountInfoListeners.push(onAfterRemoveAccountInfo);
    };

    this.paging = function (paging) {
        return httpService.get(api, { params: paging });
    };

    this.create = function (account) {
        return httpService.post(api, account);
    };

    this.update = function (account) {
        return httpService.put(api + '/' + account.id, account);
    };

    this.delete = function (id) {
        return httpService.delete(api + '/' + id);
    };

    this.changePassword = function (id) {
        return httpService.patch(api + 'id' + account.id, account);
    };

    this.getAccountById = function (id) {
        return httpService.get(api + '/' + id);
    };

    this.requestAccountInfo = function () {
        var data = cacheService.get(cacheKey);
        var deferred = $q.defer();

        var token = authService.getToken();
        if (token && token.token && new Date(token.expireOn) > new Date()) {
            if (data) {
                deferred.resolve({ data: data, status: 200 });
                return deferred.promise;
            }

            return httpService.get(api + '/info').then(function (response) {
                if (response.status === 200) {
                    cacheService.set(cacheKey, response.data);
                    onAfterSetAccountInfoListeners.forEach(function (onAfterSetAccountInfo) {
                        onAfterSetAccountInfo();
                    });
                    return response;
                }
            });
        } else {
            return deferred.promise;
        }
    };

    this.setAccountInfo = function (info) {
        this.accountInfo = info;
    };

    this.getAccountInfo = function () {
        return this.accountInfo;
    };

    //lấy dsach phân quyền
    this.getClaims = function () {
        var data = cacheService.get(cacheClaims);
        var deferred = $q.defer();
        if (data) {
            deferred.resolve({ data: data });
            return deferred.promise;
        }
        return httpService.get(api + '/claims').then(function (response) {
            if (response.status === 200) {
                cacheService.set(cacheClaims, response.data);
                return response.data;
            }
        });
    };

    //xóa bỏ dsach cache AcountClaims
    this.removeAccountClaims = function () {
        cacheService.remove(cacheClaims);
    };

    this.removeAccountInfo = function () {
        cacheService.remove(cacheKey);
        onAfterRemoveAccountInfoListeners.forEach(function (onAfterRemoveAccountInfo) {
            onAfterRemoveAccountInfo();
        });
    };

    this.changePassword = function (changePassword) {
        return httpService.post(api + '/change-password', changePassword);
    };
};

angular
    .module('account')
    .service('accountService', accountService)
accountService.$inject = ['$q', 'httpService', 'cacheService', 'authService'];