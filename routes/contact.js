var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

} else {
    var cart = req.session.cart;
    productDAO.loadByCart(cart).then(result => {
        var total = 0;
       
        res.render('contact', {
            title: 'Contact | CamShop',
            empty: false,
            products: result,
            money: total,
            money_f: priceFormat(total)
        });
    });
}
});

module.exports = router;