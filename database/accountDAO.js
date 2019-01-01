var db = require('./db');

module.exports.loadAll = function() {
    return db.executeQuery('SELECT * FROM taikhoan;');
}

module.exports.addUser = function(email, password, name) {
    var sql = `INSERT INTO taikhoan(email, matkhau, hoten) VALUES ("${email}", "${password}", "${name}");`;
    return db.executeQuery(sql);
}

module.exports.getUser = function(email) {
    var sql = `SELECT * FROM taikhoan where email = "${email}";`;
    return db.executeQuery(sql);
}


module.exports.changePassword = function(email, password) {
    var sql = ` UPDATE taikhoan SET matkhau = "${password}" where email = "${email}" `;
    return db.executeQuery(sql);
}

module.exports.updateUser = function(email, name, phoneNumber){
	var sql = `UPDATE taikhoan SET hoten = "${name}", sdt="${phoneNumber}" WHERE email = "${email}"`;
	return db.executeQuery(sql);
}