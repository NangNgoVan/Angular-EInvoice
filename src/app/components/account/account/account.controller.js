function accountController($state, $stateParams, notification, accountService, roleService, invoiceTemplateService, certificateAuthenticationService, permissionService, CONST_Permission) {
    var ctrl = this;
    ctrl.state = $state;
    ctrl.loading = false;
    ctrl.paging = {
        page: 1,
        size: 10,
    };
    ctrl.sizes = [10, 20, 50, 100];
    ctrl.account = {};

    ctrl.currentTab = 1;
    ctrl.roles = [];
    ctrl.selectTabRole = function () {
        ctrl.currentTab = 1;
        if (ctrl.roles.length > 0)
            return;

        roleService.paging().then(function (response) {
            ctrl.roles = response.data;
            ctrl.getRoles();
        });
    };
    ctrl.getRoles = function () {
        if (ctrl.account.roles) {
            if (ctrl.account.roles.length > 0) {
                for (var i = 0; i < ctrl.account.roles.length; i++) {
                    var id = ctrl.account.roles[i];
                    var role = ctrl.roles.findBy('id', id);
                    if (role) {
                        role.selected = true;
                    }
                }
            }
        }
    };
    ctrl.setRoles = function () {
        ctrl.account.roles = [];
        for (var i = 0; i < ctrl.roles.length; i++) {
            var role = ctrl.roles[i];
            if (role.selected)
                ctrl.account.roles.push(role.id);
        }
    };

    ctrl.templates = [];
    ctrl.selectTabTemplate = function () {
        ctrl.currentTab = 2;
        if (ctrl.templates.length > 0)
            return;

        invoiceTemplateService.paging().then(function (response) {
            ctrl.templates = response.data;
            ctrl.getTemplates();
        });
    };
    ctrl.getTemplates = function () {
        if (ctrl.account.invoiceTemplates) {
            if (ctrl.account.invoiceTemplates.length > 0) {
                for (var i = 0; i < ctrl.account.invoiceTemplates.length; i++) {
                    var id = ctrl.account.invoiceTemplates[i];
                    var template = ctrl.templates.findBy('id', id);
                    if (template) {
                        template.selected = true;
                    }
                }
            }
        }
    };
    ctrl.setTemplates = function () {
        ctrl.account.invoiceTemplates = [];
        for (var i = 0; i < ctrl.templates.length; i++) {
            var template = ctrl.templates[i];
            if (template.selected)
                ctrl.account.invoiceTemplates.push(template.id);
        }
    };

    ctrl.certificates = [];
    ctrl.selectTabCertificate = function () {
        ctrl.currentTab = 3;
        if (ctrl.certificates.length > 0)
            return;

        certificateAuthenticationService.paging().then(function (response) {
            ctrl.certificates = response.data;
            ctrl.getCertificate();
        });
    };
    ctrl.getCertificate = function () {
        if (ctrl.account.certificates) {
            if (ctrl.account.certificates.length > 0) {
                for (var i = 0; i < ctrl.account.certificates.length; i++) {
                    var id = ctrl.account.certificates[i];
                    var certificate = ctrl.certificates.findBy('id', id);
                    if (certificate) {
                        certificate.selected = true;
                    }
                }
            }
        }
    };
    ctrl.setCertificate = function () {
        ctrl.account.certificates = [];
        for (var i = 0; i < ctrl.certificates.length; i++) {
            var certificate = ctrl.certificates[i];
            if (certificate.selected)
                ctrl.account.certificates.push(certificate.id);
        }
    };

    ctrl.save = function () {
        if (!$('#accountForm').valid())
            return;
        
        ctrl.setRoles();
        ctrl.setTemplates();
        ctrl.setCertificate();

        ctrl.loading = true;
        if (ctrl.account.id) {
            accountService.update(ctrl.account).then(function (response) {
                if (response.status === 200) {
                    notification.success('Lưu thành công');
                    $state.go('account.list');
                }
                ctrl.loading = false;
            });
        } else {
            accountService.create(ctrl.account).then(function (response) {
                if (response.status === 200) {
                    notification.success('Lưu thành công');
                    $state.go('account.list');
                }
                ctrl.loading = false;
            });
        }
    };

    ctrl.getAccount = function(id) {
        accountService.getAccountById(id).then(function(response) {
            ctrl.account = response.data;
            ctrl.getRoles();
            ctrl.getCertificate();
            ctrl.getTemplates();
        });
    };

    ctrl.checkPermisson = function(permission1, permission2){
        if(permissionService.checkPermisson(CONST_Permission.account, permission1) || permissionService.checkPermisson(CONST_Permission.account, permission2)){
            return true;
        }
        return false;
    };

    ctrl.$onInit = function () {
        ctrl.selectTabRole();
        if ($stateParams.id) {
            ctrl.isEdit = true;
            ctrl.getAccount($stateParams.id);
        }
    };
};

angular
    .module('account')
    .controller('accountController', accountController)
accountController.$inject = ['$state', '$stateParams', 'notification', 'accountService', 'roleService', 'invoiceTemplateService', 'certificateAuthenticationService', 'permissionService', 'CONST_Permission'];