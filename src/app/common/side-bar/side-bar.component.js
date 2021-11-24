var uiSideBar = {
    templateUrl: './side-bar.template.html',
    controller: 'sideBarController',
    bindings: {
    }
};

angular
    .module('common')
    .component('uiSideBar', uiSideBar);