angular
    .module('common.auth', [
    ])
    .run(function ($transitions, $state, $stateParams, authService, accountService, headerService, notification) {

        $transitions.onStart({
            to: function (state) {
                if (!state.data)
                    return false;

                if (!state.data.requiredAuth)
                    return false;

                return true;
            }
        }, function () {
            var token = authService.getToken();
            if (!authService.isAuthenticated())
                return $state.target('auth.login');

            if (new Date(authService.objToken.expireOn) < new Date()) {
                return authService.refreshToken().then(function (response) {
                    if (response.status !== 200)
                        return $state.target('auth.login');

                    authService.setToken(response.data);
                });
            }
        });

        $transitions.onStart({
            to: 'auth.*'
        }, function (trans) {
            // var token = authService.getToken();
            // if (token && token.token && new Date(token.expireOn) > new Date()) {
            //     // return $state.go('dashboard', {}, { reload: 'dashboard' });
            //     // $state.transitionTo('dashboard', $stateParams, {
            //     //     reload: true
            //     // });
            //     return $state.go('invoice-search', {}, { reload: 'invoice-search' });
            // }
            // else if (token && token.token && new Date(token.expireOn) < new Date()) {
            //     authService.cleanToken();
            //     accountService.removeAccountInfo();
            //     accountService.removeAccountClaims();
            // }
            // else {
            //     authService.cleanToken();
            // }
        });

        // $transitions.onStart({
        //     to: function (state) {
        //         if (state.name !== 'auth.login')
        //             return true;
        //         return false;
        //     }
        // }, function () {
        //     var token = authService.getToken();
        //     if (token)
        //         return;
        //     else {
        //         notification.error('Bạn không có quyền xem nội dung trang khi chưa đăng nhập. Vui lòng đăng nhập!');
        //         // location.reload();
        //         return $state.target('auth.login');
        //     }
        // });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });