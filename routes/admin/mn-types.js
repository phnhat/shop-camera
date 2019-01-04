var productDAO = require('../../database/productDAO');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    productDAO.loadAllBrands().then(result => {
        res.render('admin/mabrands', {
            layout: 'admin/layout',
            brands: result
        })
    });
});

router.post('/add', async function (req, res, next) {
    var brand = req.body.brand;
    var nation = req.body.nation;
    try {
        var x = await productDAO.addNewBrand(brand, nation);
        res.send('Thêm nhà sản xuất mới thành công.')
    } catch (error) {
        res.send('Thêm mới thất bại, nhà sản xuất này đã tồn tại.');
    }
});

module.exports = router;