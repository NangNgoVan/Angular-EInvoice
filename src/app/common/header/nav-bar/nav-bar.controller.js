angular.module('common.header')
    .controller('navBarController', navBarController);
navBarController.$inject = ['$state', '$stateParams', 'headerService'];

function navBarController($state, $stateParams, headerService) {
    var ctrl = this;
    ctrl.state = $state;
    ctrl.stateParams = $stateParams;

    ctrl.items = headerService.getUserMenus();
};