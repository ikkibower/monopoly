var express = require("express");
var router = express.Router();
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');

var authController = require('../controllers/authcontroller.js');

var db = require("../models");



/* GET home signup page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Monopoly-Lite' });
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Monopoly-Lite' });
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Monopoly-Lite' });
});

router.get('/game', function(req, res, next) {
    res.render('game', { title: 'Monopoly-Lite' });
});
// router.get("/",
//     function(req, res) {
//         // if (req.user) {
//         //     res.render("signin");
//         // }
//         console.log(req.user);
//         res.render("game", { user: req.user });

//     });




// Signup POST Validation
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/game', // redirect to the secure game section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/game', // redirect to the secure game section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));



router.get('/login',
    function(req, res) {
        res.render('login');
    });

router.get('/logout', 
	function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


// Get Board Values
router.get("/api/propertys", function(req, res) {
    db.Property.findAll({}).then(function(values) {
        res.json(values);
    });
});

// Passport Authentication 
// router.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     })

// );
// console.log('ok');

// router.post('/login', function(req, res, next) {
//   res.render('index', { title: 'Loged In' });
// });
// Export routes for server.js to use.
module.exports = router;

