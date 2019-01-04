var express = require('express');

var productDAO = require('../../database/productDAO');
var orderDAO = require('../../database/orderDAO');
var accountDAO = require('../../database/accountDAO');

var mnBrands = require('./mn-brands');
var mnTypes = require('./mn-types');
var mnProducts = require('./mn-products');
var mnOrders = require('./mn-orders');

var router = express();

router.use('/quanlythuonghieu', mnBrands);
router.use('/quanlydonhang', mnOrders);
router.use('/quanlysanpham', mnProducts);
router.use('/quanlyloai', mnTypes);

router.get('/', function (req, res, next) {
    loadAdminDashboard(res);
});

router.get('/home', function (req, res, next) {
    res.redirect('/admin');
});

async function loadAdminDashboard(res) {
    var products = await productDAO.loadAllProducts();
    var types = await productDAO.loadAllTypes();
    var brands = await productDAO.loadAllBrands();
    var users = await accountDAO.loadAll();
    var orders = await orderDAO.loadAll();

    res.render('admin/dashboard', {
        layout: 'admin/layout',
        nProducts: products.length,
        nTypes: types.length,
        nBrands: brands.length,
        nUsers: users.length,
        nOrders: orders.length
    });
}

module.exports = router;