module.exports = function(req, res, next) {
    if(req.session.isLogged === true) {
        next();
    } else {
        res.redirect(`/signin`)
    }
}