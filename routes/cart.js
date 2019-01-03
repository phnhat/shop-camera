var express = require('express');
var priceFormat = require('../utils/price-format');
var productDAO = require('../database/productDAO');
var randomOrder = require('../utils/order-random');
var orderDAO = require('../database/orderDAO');

var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.cart.length == 0) {
        res.render('purchase/cart', {
            title: 'Giỏ hàng | CamShop',
            empty: true
        });
    } else {
        var cart = req.session.cart;
        productDAO.loadByCart(cart).then(result => {
            var total = 0;
           
            res.render('purchase/cart', {
                title: 'Giỏ hàng | CamShop',
                empty: false,
                products: result,
                money: total,
                money_f: priceFormat(total)
            });
        });
    }
});



router.post('/purchase', function (req, res, next) {
    var orderId = randomOrder();

    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;

    var cart = req.session.cart;

    productDAO.loadByCart(cart).then(result => {
        var total = 0;

     

        orderDAO.createOrder(orderId, req.session.user.email, total, name, address, phone).then(result => {
            orderDAO.createSubsOrder(orderId, cart).then(result2 => {
                productDAO.updateAfterSold(cart);
                req.session.cart = [];

                var loop = 0;
                while (loop < 10000) {
                    loop++;
                }
                
                res.redirect('/account/orders/' + orderId);
            });
        });
        
    });
});

router.post('/update-quantity', function (req, res, next) {
    var productId = req.body.productId;
    var newQuantity = req.body.quantity;

    for (var i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id == productId) {
            req.session.cart[i].quantity = parseInt(newQuantity);
        }
    }

    res.redirect('/cart');
});

router.post('/update-remove', function (req, res, next) {
    var productId = req.body.productId;

    for (var i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id == productId) {
            req.session.cart[i] = req.session.cart[0];
            req.session.cart.shift();
            break;
        }
    }

    res.redirect('/cart');
});

module.exports = router;