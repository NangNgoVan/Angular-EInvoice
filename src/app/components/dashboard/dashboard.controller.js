function dashboardController($state, notification, dashboardService, printService, cacheService) {
    var ctrl = this;
    ctrl.loading = false;
    ctrl.invoice = {};

    ctrl.notEmpty = function () {
        if (ctrl.taxCode && ctrl.id)
            return ctrl.hasError = false;
        else
            return ctrl.hasError = true;
    }

    ctrl.getInvoice = function () {
        if (ctrl.notEmpty()) {
            return;
        } else {
            ctrl.invoice = {};
            ctrl.loading = true;
            return dashboardService.getInvoice(ctrl.taxCode, ctrl.id).then(function (response) {
                if (response.status === 200) {
                    ctrl.invoice = response.data;
                    notification.success("Lấy thông tin hóa đơn thành công");
                }
                ctrl.loading = false;
            });
        }
    };

    ctrl.exportXml = function () {
        ctrl.loading = true;
        dashboardService.exportXml(ctrl.taxCode, ctrl.invoice.id).then(function (response) {
            if (response.status === 200) {
                notification.success("Xuất file xml thành công");
                xmlFileName = response.headers('File-Name');
                printService.saveFile(response.data, xmlFileName);
            }
            ctrl.loading = false;
        });
    };

    ctrl.exportPdf = function () {
        ctrl.loading = true;
        dashboardService.print(ctrl.taxCode, ctrl.invoice.id).then(function (response) {
            if (response.status === 200) {
                printService.exportPdf(response.data);
            }
            ctrl.loading = false;
        });
    };

    ctrl.reset = function () {
        ctrl.invoice = {};
    };

    ctrl.$onInit = function () {
        ctrl.reset();
    };

}
angular.module('components')
    .controller('dashboardController', dashboardController);
dashboardController.$inject = ['$state', 'notification', 'dashboardService', 'printService', 'cacheService'];