function httpInterceptor($injector) {
    var token = null;
    var refreshingPromise;
    return {
        requestError: function (config) {
            return config;
        },

        response: function (res) {
            return res;
        },

        responseError: function (res) {
            return res;
        },
        request: function (config) {
            var ignores = ["/token", "/register", ".html"];
            var hasIgnore = ignores.filter(function (x) { return config.url.endsWith(x) });
            if (hasIgnore.length > 0)
                return config;

            var authService = $injector.get('authService');
            var token = authService.getToken();

            if (!authService.isAuthenticated())
                return config;

            if (config.url.endsWith('/refresh-token')) {
                config.headers = {
                    'Authorization': 'Bearer ' + authService.objToken.token,
                    'Content-Type': 'application/json'
                };
                return config;
            }
            
            if (new Date(authService.objToken.expireOn) < new Date()) {
                if (refreshingPromise)
                    return refreshingPromise;
                else {
                    refreshingPromise = authService.refreshToken().then(function (response) {
                        if (response.status !== 200)
                            return config;

                        authService.setToken(response.data);
                        config.headers = {
                            'Authorization': 'Bearer ' + authService.objToken.token,
                            'Content-Type': 'application/json'
                        };

                        refreshingPromise = undefined;
                        return config;
                    }).catch(function () {
                        refreshingPromise = undefined;
                        return config;
                    });
                    return refreshingPromise;
                }
            } else {
                config.headers.Authorization = 'Bearer ' + authService.objToken.token;
                if (config.headers['Content-Type'] !== undefined) {
                    config.headers['Content-Type'] = 'application/json';
                }
                
                return config;
            }
        }
    };
};

angular
    .module('common.auth')
    .factory('httpInterceptor', httpInterceptor);
httpInterceptor.$inject = ['$injector'];