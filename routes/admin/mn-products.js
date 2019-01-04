var multer = require('multer');

var upload = multer({
    dest: 'public/product_img'
});

var productDAO = require('../../database/productDAO');

var idRandom = require('../../utils/id-random');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    productDAO.loadAllProducts().then(result => {
        res.render('admin/maproducts', {
            layout: 'admin/layout',
            products: result
        })
    });
});

router.get('/add', async function (req, res, next) {
    var types = await productDAO.loadAllTypes();
    var brands = await productDAO.loadAllBrands();

    res.render('admin/product-add', {
        layout: 'admin/layout',
        types: types,
        brands: brands
    });
});

router.post('/add', upload.single('image'), async function (req, res, next) {
    var id = idRandom();

    req.body.price_f = parseInt(req.body.price);
    req.body.number_f = parseInt(req.body.number);

    try {
        var x = await productDAO.addNewProduct(id, req.body);

        if (req.file) {
            var image = req.file.filename;
            var y = await productDAO.updateImage(id, image);
        }

        res.send('Thêm sản phẩm thành công.');
    } catch (error) {
        console.log(error);
        res.send('Thêm sản phẩm thất bại.');
    }
});

router.get('/edit/:productId', async function (req, res, next) {
    var product = await productDAO.loadProduct(req.params.productId);
    var types = await productDAO.loadAllTypes();
    var brands = await productDAO.loadAllBrands();

    res.render('admin/product-edit', {
        layout: 'admin/layout',
        product: product[0],
        types: types,
        brands: brands
    });
});

router.post('/edit-update', upload.single('image'), async function (req, res, next) {
    req.body.price_f = parseInt(req.body.price);
    req.body.number_f = parseInt(req.body.number);

    try {
        var v = await productDAO.updateProducInformation(req.body);

        if (req.file) {
            var image = req.file.filename;
            var y = await productDAO.updateImage(req.body.id, image);
        }

        res.send('Cập nhật thành công.');
    } catch (error) {
        res.send('Cập nhật thất bại.');
    }
});

router.post('/edit-remove', async function(req, res, next) {
    var id = req.body.id;
    try {
        var x = await productDAO.removeProduct(id);
        res.send(`Xóa sản phẩm thành công. ID: ${id}`);
    } catch (error) {
        res.send(`Xóa sản phẩm thất bại vì sản phẩm tồn tại trong các bảng dữ liệu khác.`);
    }
});

module.exports = router;