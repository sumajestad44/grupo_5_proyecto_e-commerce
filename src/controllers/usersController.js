let userController = {
    'register': function(req, res) {
        res.render('register');
    },

    'login': function(req,res) {
        res.render('login');
    },
    
    create: function(req, res){
        let usuario =  {
            nombre: req.body.name,
            apellido: req.body.apellido,
            email: req.body.email,
        }
        res.send(usuario);
        res.redirect('/');
    }
}