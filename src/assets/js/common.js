Array.prototype.groupby = function (field) {
    var arr = this;
    var groups = [];
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        var group = groups.find(function (x) { return x.key === element[field]; });
        if (group) {
            if (!group.values)
                group.values = [];
            group.values.push(element);
        } else {
            groups.push({
                key: element[field],
                values: [element]
            });
        }
    }
    return groups;
};

Array.prototype.findBy = function (field, value) {
    return this.find(function (x) { return x[field] === value });
};

function to3Words(baso) {
    var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
    var tram;
    var chuc;
    var donvi;
    var ketQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        ketQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) ketQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
        ketQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) ketQua = ketQua + " linh ";
    }
    if (chuc == 1) ketQua += " mười ";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
                ketQua += " mốt ";
            }
            else {
                ketQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                ketQua += ChuSo[donvi];
            }
            else {
                ketQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                ketQua += ChuSo[donvi];
            }
            break;
    }
    return ketQua;
};

Number.prototype.toWords = function () {
    var soTien = this;
    var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
    var lan = 0;
    var i = 0;
    var so = 0;
    var ketQua = "";
    var tmp = "";
    var viTri = new Array();
    if (soTien < 0) return "Số tiền âm !";
    if (soTien == 0) return "Không đồng !";
    if (soTien > 0) {
        so = soTien;
    }
    else {
        so = -soTien;
    }
    if (soTien > 8999999999999999) {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    viTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(viTri[5]))
        viTri[5] = "0";
    so = so - parseFloat(viTri[5].toString()) * 1000000000000000;
    viTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(viTri[4]))
        viTri[4] = "0";
    so = so - parseFloat(viTri[4].toString()) * 1000000000000;
    viTri[3] = Math.floor(so / 1000000000);
    if (isNaN(viTri[3]))
        viTri[3] = "0";
    so = so - parseFloat(viTri[3].toString()) * 1000000000;
    viTri[2] = parseInt(so / 1000000);
    if (isNaN(viTri[2]))
        viTri[2] = "0";
    viTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(viTri[1]))
        viTri[1] = "0";
    viTri[0] = parseInt(so % 1000);
    if (isNaN(viTri[0]))
        viTri[0] = "0";
    if (viTri[5] > 0) {
        lan = 5;
    }
    else if (viTri[4] > 0) {
        lan = 4;
    }
    else if (viTri[3] > 0) {
        lan = 3;
    }
    else if (viTri[2] > 0) {
        lan = 2;
    }
    else if (viTri[1] > 0) {
        lan = 1;
    }
    else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = to3Words(viTri[i]);
        ketQua += tmp;
        if (viTri[i] > 0) ketQua += Tien[i];
        if ((i > 0) && (tmp.length > 0)) ketQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (ketQua.substring(ketQua.length - 1) == ',') {
        ketQua = ketQua.substring(0, ketQua.length - 1);
    }
    ketQua = ketQua.substring(1, 2).toUpperCase() + ketQua.substring(2);
    return ketQua + ' đồng chẵn!';//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
};

