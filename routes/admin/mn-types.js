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

router.post('/update', async function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    try {
        var x = await productDAO.updateType(id, name);
        res.send('Cập nhật thành công.')
    } catch (error) {
        res.send('Cập nhật thất bại.');
    }
});

router.post('/remove', async function (req, res, next) {
    var id = req.body.id;
    console.log(req.body);
    try {
        var x = await productDAO.removeType(id);
        res.send('Xóa loại thành công.')
    } catch (error) {
        console.log(error);
        res.send('Xóa loại thất bại vì loại này tồn tại trong các bảng dữ liệu khác.');
    }
});

module.exports = router;