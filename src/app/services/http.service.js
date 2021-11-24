function httpService(CONSTANTS, $http, notification) {
    var domain = CONSTANTS.API_URL;

    this.get = function (url, config) {
        return $http
            .get(domain + url, config)
            .then(function (response) {
                if (response.status !== 200)
                    callbackError(response);
                return response;
            }, function (response) { callbackError(response); return response; });
    };

    this.post = function (url, data) {
        return $http
            .post(domain + url, data)
            .then(function (response) {
                if (response.status !== 200)
                    callbackError(response);
                return response;
            }, function (response) { callbackError(response); return response; });
    };

    this.put = function (url, data) {
        return $http
            .put(domain + url, data)
            .then(function (response) {
                if (response.status !== 200)
                    callbackError(response);
                return response;
            }, function (response) { callbackError(response); return response; });
    };

    this.patch = function (url, data) {
        return $http
            .patch(domain + url, data)
            .then(function (response) {
                if (response.status !== 200)
                    callbackError(response);
                return response;
            }, function (response) { callbackError(response); return response; });
    };

    this.delete = function (url) {
        return $http
            .delete(domain + url)
            .then(function (response) {
                if (response.status !== 200)
                    callbackError(response);
                return response;
            }, function (response) { callbackError(response); return response; });
    };

    var callbackError = function (response) {
        if (response.status === -1)
            notification.error('Server không phản hồi');
        else {
            if (Array.isArray(response.data))
                notification.error(response.data[0].description);
            else{
                 if (response.data instanceof Blob) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        notification.error(reader.result);
                    };
                    reader.readAsText(response.data);
                }
                else
                    notification.error(response.data || response.statusText);
            }
        }
    };
};

angular
    .module('services')
    .service('httpService', httpService);
httpService.$inject = ['CONSTANTS', '$http', 'notification'];