var db = require('./db');

module.exports.loadAllProducts = function () {
    return db.executeQuery('SELECT * FROM sanpham;');
}

module.exports.loadAllTypes = function () {
    return db.executeQuery('SELECT * FROM loaisanpham;');
}

module.exports.loadAllBrands = function () {
    return db.executeQuery('SELECT * FROM thuonghieu;');
}

module.exports.load10Newest = function () {
    var sql = `SELECT * FROM sanpham ORDER BY ngaytiepnhan DESC LIMIT 10;`;
    return db.executeQuery(sql);
}

module.exports.load10BestSell = function () {
    var sql = `SELECT * FROM sanpham ORDER BY luotban DESC LIMIT 10;`;
    return db.executeQuery(sql);
}

module.exports.load10MostViews = function () {
    var sql = `SELECT * FROM sanpham ORDER BY luotxem DESC LIMIT 10;`;
    return db.executeQuery(sql);
}

module.exports.loadTypes = function () {
    var sql = `SELECT * FROM loaisanpham;`
    return db.executeQuery(sql);
}

module.exports.loadBrands = function () {
    var sql = `SELECT * FROM thuonghieu`;
    return db.executeQuery(sql);
}

module.exports.loadNations = function () {
    var sql = `SELECT DISTINCT xuatxu FROM sanpham;`;
    return db.executeQuery(sql);
}

module.exports.loadTypeName = function (type) {
    var sql = `SELECT tenloai FROM loaisanpham WHERE loai = "${type}";`;
    return db.executeQuery(sql);
}

module.exports.loadProduct = function (id) {
    var sql = `SELECT * FROM sanpham WHERE idsanpham = "${id}";`;
    return db.executeQuery(sql);
}

module.exports.loadProductRelatedType = function (type, id) {
    var sql = `SELECT * FROM sanpham WHERE loai = "${type}" AND idsanpham != "${id}" LIMIT 5;`;
    return db.executeQuery(sql);
}

module.exports.loadProductRelatedBrand = function (brand, id) {
    var sql = `SELECT * FROM sanpham WHERE nhasanxuat = "${brand}" AND idsanpham != "${id}" LIMIT 5;`;
    return db.executeQuery(sql);
}

module.exports.searchProduct = function (name, brand, type, nation, min, max) {
    var sql;
    var _min, _max;

    if (min == undefined) {
        _min = 0;
    } else {
        _min = min;
    }

    if (max == undefined) {
        _max = 100000000;
    } else {
        _max = max;
    }

    if (name != '' && name != undefined) {
        sql = `SELECT * FROM sanpham WHERE tensanpham like "%${name}%" AND gia > ${_min} AND gia < ${_max} `;

        if (brand != 'all' && brand != undefined) {
            sql += ` AND nhasanxuat = "${brand}" `;
        }

        if (type != 'all' && type != undefined) {
            sql += ` AND loai="${type}" `;
        }

        if (nation != 'all' && nation != undefined) {
            sql += ` AND xuatxu="${nation}" `;
        }
    } else {
        sql = `SELECT * FROM sanpham WHERE gia > ${_min} AND gia < ${_max} `;

        if (brand != 'all' && brand != undefined) {
            sql += ` AND nhasanxuat="${brand}" `;
        }

        if (type != 'all' && type != undefined) {
            sql += ` AND loai="${type}" `;
        }

        if (nation != 'all' && nation != undefined) {
            sql += ` AND xuatxu="${nation}" `;
        }
    }

    return db.executeQuery(sql);
}

module.exports.searchProductPag = function (name, brand, type, nation, min, max, page) {
    var sql;
    var _min, _max;

    if (min == undefined) {
        _min = 0;
    } else {
        _min = min;
    }

    if (max == undefined) {
        _max = 100000000;
    } else {
        _max = max;
    }

    if (name != '' && name != undefined) {
        sql = `SELECT * FROM sanpham WHERE tensanpham like "%${name}%" AND gia > ${_min} AND gia < ${_max} `;

        if (brand != 'all' && brand != undefined) {
            sql += ` AND nhasanxuat = "${brand}" `
        }

        if (type != 'all' && type != undefined) {
            sql += ` AND loai="${type}" `;
        }

        if (nation != 'all' && nation != undefined) {
            sql += ` AND xuatxu="${nation}" `;
        }
    } else {
        sql = `SELECT * FROM sanpham WHERE gia > ${_min} AND gia < ${_max} `;

        if (brand != 'all' && brand != undefined) {
            sql += ` AND nhasanxuat="${brand}" `;
        }

        if (type != 'all' && type != undefined) {
            sql += ` AND loai="${type}" `;
        }

        if (nation != 'all' && nation != undefined) {
            sql += ` AND xuatxu="${nation}" `;
        }
    }

    var n = parseInt(page);

    var pageNumber = 4 * (n - 1);

    sql += ` LIMIT 4 OFFSET ${pageNumber}; `;

    return db.executeQuery(sql);
}

module.exports.increaseViews = function (id) {
    var sql = `UPDATE sanpham SET luotxem = luotxem + 1 WHERE idsanpham = "${id}";`
    return db.executeQuery(sql);
}

module.exports.loadByCart = function (cart) {
    var sql = `SELECT * FROM sanpham WHERE idsanpham = "${cart[0].id}" `;
    for (var i = 1; i < cart.length; i++) {
        sql += ` OR idsanpham = "${cart[i].id}" `;
    }
    return db.executeQuery(sql);
}

module.exports.updateAfterSold = function (cart) {
    updateNSold(cart);
    updateInventory(cart);
}

module.exports.loadBySubsOrder = function (sub) {
    var sql = `SELECT * FROM sanpham WHERE idsanpham = "${sub[0].idsanpham}" `;
    for (var i = 1; i < sub.length; i++) {
        sql += ` OR idsanpham = "${sub[i].idsanpham}" `;
    }
    return db.executeQuery(sql);
}

async function updateNSold(cart) {
    for (let i = 0; i < cart.length; i++) {
        let sql = `UPDATE sanpham SET luotban = luotban + ${cart[i].quantity} WHERE idsanpham = "${cart[i].id}";`;
        var temp = await db.executeQuery(sql);
    }
}

async function updateInventory(cart) {
    for (let i = 0; i < cart.length; i++) {
        let sql = `UPDATE sanpham SET soluong = soluong - ${cart[i].quantity} WHERE idsanpham = "${cart[i].id}";`;
        var temp = await db.executeQuery(sql);
    }
    var final = await db.executeQuery(`UPDATE sanpham SET soluong = 0 WHERE soluong < 0;`);
}

module.exports.updateProducInformation = function (info) {
    console.log(info);
    var sql = `UPDATE sanpham SET tensanpham="${info.name}", 
                gia=${info.price_f}, loai="${info.type}", nhasanxuat = "${info.brand}", xuatxu= "${info.origin}", mota = "${info.detail}", soluong = ${info.number_f} 
                WHERE idsanpham = "${info.id}" ;`;
    return db.executeQuery(sql);
}

module.exports.addNewProduct = function (id, info, img) {
    var sql = `INSERT INTO sanpham (idsanpham, tensanpham, gia, loai, nhasanxuat, xuatxu, mota, soluong, ngaytiepnhan) 
                VALUES ("${id}", "${info.name}", ${info.price_f}, "${info.type}", "${info.brand}", "${info.origin}", "${info.detail}", ${info.number_f}, NOW());`;
    return db.executeQuery(sql);
}

module.exports.updateImage = function(id, img) {
    var sql = `UPDATE sanpham SET img = "${img}" WHERE idsanpham = "${id}";`
    return db.executeQuery(sql);
}

module.exports.removeProduct = function(id) {
    var sql = `DELETE FROM sanpham WHERE idsanpham = "${id}";`;
    return db.executeQuery(sql);
}

module.exports.addNewType = function (id, name) {
    var sql = `INSERT INTO loaisanpham (loai, tenloai) VALUES ("${id}", "${name}");`;
    return db.executeQuery(sql);
}

module.exports.updateType = function (id, name) {
    var sql = `UPDATE loaisanpham SET tenloai = "${name}" WHERE loai = "${id}";`;
    return db.executeQuery(sql);
}

module.exports.removeType = function (id) {
    var sql = `DELETE FROM loaisanpham WHERE loai = "${id}";`;
    return db.executeQuery(sql);
}

module.exports.addNewBrand = function (name, nation) {
    var sql = `INSERT INTO thuonghieu (nhasanxuat, quocgia) VALUES ("${name}", "${nation}");`;
    return db.executeQuery(sql);
}

module.exports.updateBrand = function(name, nation) {
    var sql = `UPDATE thuonghieu SET quocgia = "${nation}" WHERE nhasanxuat = "${name}";`;
    return db.executeQuery(sql);
}

module.exports.removeBrand = function (name) {
    var sql = `DELETE FROM thuonghieu WHERE nhasanxuat = "${name}";`;
    return db.executeQuery(sql);
}