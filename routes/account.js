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