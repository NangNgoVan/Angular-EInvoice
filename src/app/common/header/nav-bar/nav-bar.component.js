var uiNavBar = {
    controller: 'navBarController',
    templateUrl: './nav-bar.template.html'
}

angular
    .module('common.header')
    .component('uiNavBar', uiNavBar);