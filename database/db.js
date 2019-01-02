var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

module.exports.executeQuery = function (query) {
    return new Promise(function (succ, fail) {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'laluto123',
            database: 'camera_shop'
        });

        connection.connect()

        connection.query(query, function (error, results, fields) {
            if (error) {
                fail(error);
            } else {
                succ(results);
            }
            connection.end();
        });
    });
}

var sessionStore;

module.exports.sessions = {
    getSessionStore: function () {
        sessionStore = new MySQLStore({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'laluto123',
            database: 'camera_shop',
            createDatabaseTable: true,
            schema: {
                tableName: 'sessions',
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data'
                }
            }
        });
        return sessionStore;
    }
}