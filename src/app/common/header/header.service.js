function headerService(httpService) {
    var cacheKey = 'menu';
    this.addOnAfterSetMenu = function (onAfterSetMenu) {
        onAfterSetMenuListeners.push(onAfterSetMenu);
    };

    this.addOnAfterRemoveMenu = function (onAfterRemoveMenu) {
        onAfterRemoveMenuListeners.push(onAfterRemoveMenu);
    };

    this.getMenus = function () {
        return httpService.get('/api/accounts/menus');
    };

    this.getUserMenus = function () {
        var menus = [
            {
                name: 'user.dashboard',
                label: 'Trang chủ',
                icon: 'icon-home4'
            },
            {
                name: 'user.invoices.list',
                label: 'Tra cứu',
                icon: 'icon-search4'
            },
            {
                name: 'user.invoices.approval',
                label: 'Phê duyệt',
                icon: 'icon-checkmark-circle2'
            },
            {
                name: 'user.invoices.select-template',
                label: 'Lập hóa đơn mới',
                icon: 'icon-pen-plus'
            },
            {
                name: 'user.init-bc26',
                label: 'Lập báo cáo'
            },
            {
                name: null,
                label: 'Khác',
                subItems:
                [
                    {
                        name: 'user.invoices.cancel',
                        label: 'Hủy hóa đơn',
                        icon: 'icon-cross2'
                    }
                ]
            }
        ];
        return menus;
    };
 
    this.getAdminMenus = function () {
        var menus = [
            { code: 'dashboard', name: 'Trang chủ', icon: 'icon-home4' },
            { code: 'invoice-reference-guide', name: 'Hướng dẫn tra cứu hóa đơn', icon: 'fa fa-sign-out' },
            // { code: 'invoice-introduce', name: 'Giới thiệu VACOM-INVOICE', icon: 'fa fa-dashboard' },
            { code: 'invoice-about', name: 'Hóa đơn điện tử là gì?', icon: 'fa fa-bullhorn' },
            { code: 'invoice-advantage', name: 'Ưu điểm của HĐĐT VN Invoice', icon: 'fa fa-tasks' },
            { code: 'invoice-typical-customer-list', name: 'Danh sách khách hàng tiêu biểu', icon: 'fa fa-table' },
            { code: 'invoice-legal-basis', name: 'Cơ sở pháp lý của HĐĐT', icon: 'fa fa-inbox' },
            { code: 'invoice-release-procedure', name: 'Thủ tục thông báo phát hành', icon: 'fa fa-bold' },
            { code: 'invoice-condition', name: 'Điều kiện để sử dụng HĐĐT', icon: 'fa fa-book' },
            { code: 'invoice-question', name: 'Câu hỏi thường gặp về HĐĐT', icon: 'fa fa-paste' },
            // {
            //     name: 'Tra cứu',
            //     icon: 'fa fa-cog',
            //     subItems:
            //     [
            //         { code: 'http://vacom.vn/Tra-cuu-ma-so-thue-doanh-nghiep', name: 'Tra cứu mã số thuế doanh nghiệp', icon: 'fa fa-inbox' },
            //         { code: 'http://vacom.vn/Tra-cuu-ma-so-thue-ca-nhan', name: 'Tra cứu mã số thuế cá nhân', icon: 'fa fa-inbox' },
            //         { code: 'http://vacom.vn/Tra-cuu-thong-bao-phat-hanh-hoa-don-doanh-nghiep', name: 'Tra cứu thông báo phát hành hóa đơn doanh nghiệp', icon: 'fa fa-inbox' }
            //     ]
            // },

        ];
        return menus;
    };

};

angular
    .module('common')
    .service('headerService', headerService);
headerService.$inject = ['httpService'];