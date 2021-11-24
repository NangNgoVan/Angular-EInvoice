function authService(httpService, cacheService) {
    this.objToken = null;
    this.user = sessionStorage.getItem('user') != null ? 
        JSON.parse(sessionStorage.getItem('user')) : null;
    // var onAfterSetTokenListeners = [];
    // var onAfterRemoveTokenListeners = [];

    // this.addOnAfterSetToken = function (onAfterSetToken) {
    //     onAfterSetTokenListeners.push(onAfterSetToken);
    // };

    // this.addOnAfterRemoveToken = function (onAfterRemoveToken) {
    //     onAfterRemoveTokenListeners.push(onAfterRemoveToken);
    // };

    this.setToken = function (value) {
        cacheService.set('token', value);
        // onAfterSetTokenListeners.forEach(function (onAfterSetToken) {
        //     onAfterSetToken();
        // });
        this.objToken = value;
    };

    this.getToken = function () {
        this.objToken = cacheService.get('token');
        return this.objToken;
    };

    this.cleanToken = function () {
        this.user = null;
        cacheService.remove('token');
        this.objToken = null;
    };

    this.login = function (user) {
        return httpService.post('/api/customers/login', user);
    };

    this.logout = function() {
        this.user = null;
        sessionStorage.clear();
    }

    this.refreshToken = function () {
        return httpService.get('/refresh-token');
    };

    this.isAuthenticated = function () {
        if (!this.objToken)
            return false;

        if (!this.objToken.token)
            return false;
        return true;
    };

    this.saveUser = function (user) {
        this.user = {};
        this.user.customers = user;
        this.user.customerIds = this.user.customers.map( function (usr) {
            return usr.id;
        });
        // save user
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }

    // get user credential accompanying with request
    this.getUserAuthorization = function() {
        if(this.user) {
            return user.id;
        }
        return null;
    }

    this.loggedIn = function(){
        return this.user != null;
    }
};

angular
    .module('common.auth')
    .service('authService', authService);
authService.$inject = ['httpService', 'cacheService'];