var login = {
  templateUrl: './login.template.html',
  controller: 'loginController',
};

angular
  .module('common.auth')
  .component('login', login)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      });
    $urlRouterProvider.otherwise('/auth/login');
  });
