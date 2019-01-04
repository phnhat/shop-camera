var express = require('express');

var orderDAO = require('../../database/orderDAO');
var productDAO = require('../../database/productDAO');
var dateFormat = require('../../utils/date-format');
var priceFormat = require('../../utils/price-format');
var switcher = require('../../utils/switch-code');

var router = express.Router();

router.get('/', function (req, res, next) {
    orderDAO.loadAll().then(result => {
        for (var i = 0; i < result.length; i++) {
            if (result[i].trangthai == 0) {
                result[i].not = true;
            } else if (result[i].trangthai == 1) {
                result[i].being = true;
            } else if (result[i].trangthai == 2) {
                result[i].done = true;
            }
            result[i].ngay_f = dateFormat(result[i].ngay);
            result[i].thanhtien_f = priceFormat(result[i].thanhtien);
        }
        res.render('admin/maorders', {
            layout: 'admin/layout',
            orders: result
        })
    });
});

router.get('/order/:orderId', async function (req, res, next) {
    var orderId = req.params.orderId;

    var _order = await orderDAO.loadOrder(orderId);
    var _subsOrder = await orderDAO.loadSubsOrder(orderId);
    var _list = await productDAO.loadBySubsOrder(_subsOrder);

    for (var i = 0; i < _subsOrder.length; i++) {
        for (var j = 0; j < _list.length; j++) {
            _list[j].gia_f = priceFormat(_list[j].gia);
            if (_subsOrder[i].idsanpham == _list[j].idsanpham) {
                _subsOrder[i].info = _list[j];
                break;
            }
        }
    }

    if (_order[0].trangthai == 0) {
        _order[0].not = true;
    } else if (_order[0].trangthai == 1) {
        _order[0].being = true;
    } else if (_order[0].trangthai == 2) {
        _order[0].done = true;
    }

    _order[0].thanhtien_f = priceFormat(_order[0].thanhtien);
    _order[0].ngay_f = dateFormat(_order[0].ngay);
    _order[0].trangthai_f = switcher.codeToStatus(_order[0].trangthai);

    res.render('admin/order', {
        layout: 'admin/layout',
        order: _order[0],
        subsOrder: _subsOrder
    });
});

router.post('/update', async function (req, res, next) {
    console.log(req.body);
    var madon = req.body.madon;
    var status = req.body.status;
    try {
        var x = await orderDAO.updateOrder(madon, parseInt(status));
        res.send('Cập nhật tình trạng đơn hàng thành công.');
    } catch (error) {
        res.send('Cập nhật tình trạng đơn hàng thất bại.');
    }
});

module.exports = router;