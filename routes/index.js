var express = require('express');
var productDAO = require('../database/productDAO');
var priceFormat = require('../utils/price-format');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('----- Current Session -----')
  console.log(req.session);
  console.log('---------------------------');
  productDAO.load10Newest()
  .then(list10Newest => {
    productDAO.load10BestSell()
    .then(list10BestSell => {
      productDAO.load10MostViews()
      .then(list10MostViews => {
        for(let i = 0; i < 10; i++) {
          list10Newest[i].gia_f = priceFormat(list10Newest[i].gia);
          list10BestSell[i].gia_f = priceFormat(list10BestSell[i].gia);
          list10MostViews[i].gia_f = priceFormat(list10MostViews[i].gia);
        }
        res.render('index', {
          title: 'CamShop | Siêu thị máy ảnh trực tuyến',
          newest_list: list10Newest,
          bestsell_list: list10BestSell,
          mostviews_list: list10MostViews
        });
      })
      .catch(error3 => {
        // Lỗi khi load 10 sản phẩm xem nhiều nhất
      })
    })
    .catch(error2 => {
      // Lỗi khi load 10 sản phẩm bán chạy nhất
    });
  })
  .catch(error1 => {
    // Lỗi khi load 10 sản phẩm mới nhất
  });
});

module.exports = router;
