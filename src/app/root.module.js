angular
    .module('root', [
        'ui.router',
        'common',
        'components',
        'services',
        'templates'
    ])
    .constant('CONSTANTS', {
        // API_URL: 'https://dev.vninvoice.vn'
        // API_URL: 'http://192.168.10.114'
        // API_URL: 'http://localhost:59034'
        API_URL: 'https://mic1.test.vninvoice.vn'
    })
    .config(function (storeProvider, $urlRouterProvider) {
        storeProvider.setStore('localStorage');

        $urlRouterProvider.when('', '/dashboard');
    })
    // .run(checkTokenBeforeLoadPage)
    .factory('diStoreFactory', function (store) {
        return store.getNamespacedStore('di');
    });

function checkTokenBeforeLoadPage($state, $transitions, authService, accountService) {
    $transitions.onStart({
        to: function (state) {
            if (state.name === 'dashboard')
                return true;
            return false;
        }
    }, function (trans) {
        // var token = authService.getToken();
        // if (token && token.token && new Date(token.expireOn) > new Date()) {
        //     return $state.go('invoice-search', {}, { reload: 'invoice-search' });
        // }
        // else if (token && token.token && new Date(token.expireOn) < new Date()) {
        //     authService.cleanToken();
        //     accountService.removeAccountInfo();
        //     accountService.removeAccountClaims();
        //     return $state.go('dashboard', {}, { reload: 'dashboard' });
        // }
        // else {
        //     authService.cleanToken();
        // }
    });
}


//check token khi bắt đầu mở trình duyệt và vào app
// function checkTokenBeforeLoadPage($state, $transitions, notification, authService, cacheService, headerService, accountService) {
    // check token khi bắt đầu mở trình duyệt và vào app

    // var token = authService.getToken();
    // debugger;
    // if (token && (new Date(authService.objToken.expireOn) < new Date())) {
    //     authService.cleanToken();
    //     accountService.removeAccountInfo();
    //     accountService.removeAccountClaims();
    //     notification.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại!');
    //     $state.go('auth.login');
    // }
    // else if (token && (new Date(authService.objToken.expireOn) > new Date())) {
    //     return;
    // }
    // else {
        // notification.error('Bạn chưa đăng nhập. Vui lòng đăng nhập!');
        // $state.go('auth.login');
//     }
// }