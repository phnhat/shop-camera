var express = require('express');
var productDAO = require('../database/productDAO');
var priceFormat = require('../utils/price-format');
var switcher = require('../utils/switch-code');

var router = express.Router();

router.all('/:productID', function (req, res, next) {
    if (req.params.productID === 'product-handle') {
        next();
    } else {
        var productID = req.params.productID;
        productDAO.increaseViews(productID).then();
        productDAO.loadProduct(productID).then(result => {
            var info = {}; // Chứa thông tin sản phẩm
            productDAO.loadTypeName(result[0].loai).then(typeName => {
                
                info.id = result[0].idsanpham;
                info.name = result[0].tensanpham;
                info.price = result[0].gia;
                info.price_f = priceFormat(result[0].gia);
                info.brand = result[0].nhasanxuat;
                info.nation = result[0].xuatxu;
                info.nation_f = switcher.codeToNation(result[0].xuatxu);
                info.type = result[0].loai;
                info.type_f = typeName[0].tenloai;
                info.nviews = result[0].luotxem;
                info.nsold = result[0].luotban;
                info.detail = result[0].mota;
                info.img = result[0].img;
                info.date = result[0].ngaytiepnhan;

                productDAO.loadProductRelatedType(info.type, info.id).then(typeList => {
                    productDAO.loadProductRelatedBrand(info.brand, info.id).then(brandList => {
                        for (let k = 0; k < typeList.length; k++) {
                            typeList[k].gia_f = priceFormat(typeList[k].gia);
                        }

                        for (let h = 0; h < brandList.length; h++) {
                            brandList[h].gia_f = priceFormat(brandList[h].gia);
                        }

                        res.render('product/product', {
                            title: info.name + ' | CamShop',
                            product: info,
                            related_type_list: typeList,
                            related_brand_list: brandList
                        });
                    });
                });
            });
        });
    }
});


module.exports = router;