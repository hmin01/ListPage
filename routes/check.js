module.exports =  {
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            return res.json({isLoggedIn: false, name:null});
        }
    },
    isLoggedIn_main: function(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.render('main', {isLoggedIn: false, name:null});
        }
    },
    isNotLoggedIn: function(req, res, next) {
        if(!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/main');
        }
    },
    isLoggedIn_doWrite: function(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    },
};