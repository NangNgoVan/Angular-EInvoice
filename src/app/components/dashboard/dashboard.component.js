var uiDashboard = {
    templateUrl: './dashboard.template.html',
    controller: 'dashboardController'
};

angular.module('components')
    .component('uiDashboard', uiDashboard)
    .config(function ($stateProvider) {
        $stateProvider.state('dashboard', {
            url: '/dashboard',
            component: 'uiDashboard'
        });
    });