 function adminMiddleware(req,res,next) {
    let userLogueado = res.locals.userLogged;
    if(userLogueado.category !== "Admin"){
        return res.redirect('/')
    }
    next();
    
}

module.exports = adminMiddleware; 
