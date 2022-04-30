function authMiddleware(req,res,next) {
    if (!req.session.userLogged) {
        return res.redirect('/src/views/login.ejs')
    }
    next();
    
}

module.exports = authMiddleware;