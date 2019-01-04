var productDAO = require('../../database/productDAO');

var mnBrands = require('./mn-brands');
var mnTypes = require('./mn-types');

var express = require('express');
var router = express();

router.use('/quanlythuonghieu', mnBrands);
router.use('/quanlyloai', mnTypes);

router.get('/', function (req, res, next) {
    loadAdminDashboard(res);
});

router.get('/home', function (req, res, next) {
    res.redirect('/admin');
});

async function loadAdminDashboard(res) {

    var brands = await productDAO.loadAllBrands();
    var types = await productDAO.loadAllTypes();

    res.render('admin/dashboard', {
        layout: 'admin/layout',
        nBrands: brands.length,
        nTypes: types.length,
    });

}

module.exports = router;