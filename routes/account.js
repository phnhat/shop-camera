var accountDAO = require('../database/accountDAO');
var orderDAO = require('../database/orderDAO');
var productDAO = require('../database/productDAO');
var priceFormat = require('../utils/price-format');
var dateFormat = require('../utils/date-format');
var switcher = require('../utils/switch-code');
var md5 = require('md5');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('account/update-info', {
        title: 'Cập nhật thông tin cá nhân | CamShop',
        user: req.session.user,
        update_succ: req.session.update_succ
    });

    if (req.session.update_succ) {
        delete req.session.update_succ;
    }
});

router.post('/', function (req, res, next) {
    accountDAO.updateUser(req.session.user.email, req.body.name, req.body.phone).then(result => {
        req.session.update_succ = true;
        req.session.user.hoten = req.body.name;
        req.session.user.sdt = req.body.phone;
        res.redirect('/account');
    });

});

router.get('/password', function (req, res, next) {
    res.render('account/password', {
        title: 'Đổi mật khẩu | CamShop',
        succ: req.session.change_password_succ,
        fail: req.session.change_password_fail
    });

    if (req.session.change_password_succ != undefined) {
        delete req.session.change_password_succ;
    }

    if (req.session.change_password_fail != undefined) {
        delete req.session.change_password_fail;
    }

});

router.post('/password', function (req, res, next) {
    var old_password = md5(req.body.old_password);
    if(old_password == req.session.user.matkhau) {
        var new_password = md5(req.body.new_password);
        accountDAO.changePassword(req.session.user.email, new_password).then(result => {
            req.session.change_password_succ = true;
            req.session.user.matkhau = new_password;
            res.redirect('/account/password');
        });
    } else {
        req.session.change_password_fail = true;
        res.redirect('/account/password');
    }
});

router.get('/orders', function (req, res, next) {
    orderDAO.loadUserOrders(req.session.user.email).then(result => {
        for (var i = 0; i < result.length; i++) {
            result[i].ngay_f = dateFormat(result[i].ngay);
            result[i].trangthai_f = switcher.codeToStatus(result[i].trangthai);
            result[i].thanhtien_f = priceFormat(result[i].thanhtien);
        }
        res.render('account/orders', {
            title: 'Quản lý đơn hàng | CamShop',
            orders: result
        })
    });
});

router.get('/orders/:orderId', function (req, res, next) {
    var orderId = req.params.orderId;
    orderDAO.loadOrder(orderId).then(_order => {
        orderDAO.loadSubsOrder(orderId).then(_subsOrder => {
            productDAO.loadBySubsOrder(_subsOrder).then(list => {
                for (var i = 0; i < _subsOrder.length; i++) {
                    for (var j = 0; j < list.length; j++) {
                        list[j].gia_f = priceFormat(list[j].gia);
                        if (_subsOrder[i].idsanpham == list[j].idsanpham) {
                            _subsOrder[i].info = list[j];
                            break;
                        }
                    }
                }
                _order[0].thanhtien_f = priceFormat(_order[0].thanhtien);
                _order[0].ngay_f = dateFormat(_order[0].ngay);
                _order[0].trangthai_f = switcher.codeToStatus(_order[0].trangthai);
                res.render('account/order-detail', {
                    title: 'Thông tin đơn hàng | CamShop',
                    order: _order[0],
                    subsOrder: _subsOrder
                });
            });
        });
    });
});

module.exports = router;