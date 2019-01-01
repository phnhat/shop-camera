var express = require('express');
var productDAO = require('../database/productDAO');
var priceFormat = require('../utils/price-format');

// Chua kiem tra page number

var router = express();



router.get('/list', function (req, res, next) {
    var params = req.query;
    var currentPage = params.page;
    if (currentPage == undefined || currentPage == '') {
        currentPage = 1;
    }
    productDAO.searchProduct(params.name, params.brand, params.type, params.nation, params.min, params.max)
        .then(resultAll => {
            var nPages = Math.floor(resultAll.length / 4);
            if (resultAll.length % 4 != 0) {
                nPages++;
            }
            productDAO.searchProductPag(params.name, params.brand, params.type, params.nation, params.min, params.max, currentPage)
                .then(result => {
                    for (var i = 0; i < result.length; i++) {
                        result[i].gia_f = priceFormat(result[i].gia);
                    }


                    res.render('product/list', {
                        title: 'Kết quả tìm kiếm | CamShop',
                        products: result,
                        amount: resultAll.length,
                        query: req.query,
                        pages: _pages
                    })
                });
        })
});

module.exports = router;