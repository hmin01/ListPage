const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const check = require('./check');
const user_table = require('../models').User;

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/main', check.isLoggedIn_main, function(req, res) {
    res.render('main', {isLoggedIn: true, name: req.user.name});
});

router.get('/check', check.isLoggedIn, function(req, res) {
    console.log('index.js : ' + true);
    res.json({isLoggedIn: true, name: req.user.name});
});

router.get('/register', function(req, res) {
    res.render("register");
});

router.post('/save', check.isNotLoggedIn, async function (req, res, next) {
    const { user_id, name, password, phone } = req.body;
    try {
        const isExist = await user_table.find({
            where: { user_id: user_id }
        });

        if(isExist) {
            return res.json({result: false, code: 101, message:'이미 가입된 이메일입니다.'});
        }
        const hash = await bcrypt.hash(password, 12);
        await user_table.create({
            user_id: user_id,
            name: name,
            password: hash,
            phone: phone,
            createdAt: new Date()
        });
        return res.json({result: true});
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', check.isNotLoggedIn, function(req, res, next) {
    passport.authenticate('local', function (authError, user, info) {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, function(loginError) {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({result: true});
        });
    })(req, res, next);
});

router.get('/logout', check.isLoggedIn_main, function(req, res) {
    req.logout();
    req.session.destroy();
    res.json({result: true});
});

module.exports = router;
