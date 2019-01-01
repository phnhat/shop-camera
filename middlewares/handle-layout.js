var productDAO = require('../database/productDAO');

module.exports = function (req, res, next) {
    productDAO.loadTypes().then(rowsTypes => {
        productDAO.loadBrands().then(rowsBrands => {
            res.locals.layoutVM = {
                typesList: rowsTypes,
                brandsList: rowsBrands,
                isLogged: req.session.isLogged,
                isAdmin: req.session.isAdmin,
                user: req.session.user
            }
            next();
        });
    });
}