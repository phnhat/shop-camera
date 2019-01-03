var accountDAO = require('../database/accountDAO');

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

module.exports = router;