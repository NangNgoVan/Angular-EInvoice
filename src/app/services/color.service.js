function colorService() {
    var colorInvoiceStatuses = {
        Goc: 'bg-indigo-800',
        XoaBo: 'bg-danger',
        XoaHuy: 'bg-danger',
        ThayThe: 'bg-success',
        BiThayThe: 'bg-violet',
        BiDieuChinhDinhDanh: 'bg-warning',
        DieuChinhDinhDanh: 'bg-pink',
        DieuChinhTangGiam: 'bg-teal',
        BiDieuChinhTangGiam: 'bg-purple'
    };

    this.colorInvoiceStatus = function (status) {
        return colorInvoiceStatuses[status];
    };

    var invoiceStatusNames = {
        Goc: 'Gốc',
        XoaBo: 'Hủy',
        ThayThe: 'Thay thế',
        BiThayThe: 'Bị thay thế',
        DieuChinhDinhDanh: 'Điều chỉnh định danh',
        BiDieuChinhDinhDanh: 'Bị điều chỉnh định danh',
        DieuChinhTangGiam: 'Điều chỉnh tăng/giảm',
        BiDieuChinhTangGiam: 'Bị điều chỉnh tăng/giảm',
        XoaHuy: 'Xóa',
        Huy: 'Hủy'
    };

    this.invoiceStatusName = function (status) {
        return invoiceStatusNames[status];
    };
};

angular
    .module('services')
    .service('colorService', colorService);
colorService.$inject = [];