var productDAO = require('../../database/productDAO');

var mnBrands = require('./mn-brands');

var express = require('express');
var router = express();

router.use('/quanlythuonghieu', mnBrands);

router.get('/', function (req, res, next) {
    loadAdminDashboard(res);
});

router.get('/home', function (req, res, next) {
    res.redirect('/admin');
});

async function loadAdminDashboard(res) {

    var brands = await productDAO.loadAllBrands();

    res.render('admin/dashboard', {
        layout: 'admin/layout',
        nBrands: brands.length,
    });

}

module.exports = router;