angular
    .module('components', [
        'ui.router',
        'angular-storage',
        'ngSanitize',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngAnimate',
        'ui-notification',
        'account'
    ])
    .config(function (notificationProvider) {
        notificationProvider.setOptions({
            delay: 10000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    })
    .run(function ($transitions, cfpLoadingBar) {
        $transitions.onStart({}, cfpLoadingBar.start);
        $transitions.onSuccess({}, cfpLoadingBar.complete);
    })
    .run(function ($transitions, $state, authService, notification) {   // trong phiên làm việc khi chuyển state sẽ được refresh token hoặc giữ nguyên khi token còn hạn
        $transitions.onStart({
            to: function (state) {
                if (state.name !== 'auth.login')
                    return true;
                return false;
            }
        }, function () {
            var token = authService.getToken();
            if (token && (new Date(authService.objToken.expireOn) < new Date())) {
                authService.refreshToken().then(function (response) {
                    if (response.status === 200)
                        authService.setToken(response.data);
                });

            }
            else if (token && (new Date(authService.objToken.expireOn) > new Date())) {
                return;
            }
        });
    });