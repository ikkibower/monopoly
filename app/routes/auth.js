// var authController = require('../controllers/authcontroller.js');

// module.exports = function(app,passport){

// app.get('/signup', authController.signup);


// app.get('/login', authController.signin);


// app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/game',
//                                                     failureRedirect: '/signup'}
//                                                     ));


// app.get('/game',isLoggedIn, authController.game);


// app.get('/logout',authController.logout);


// app.post('/login', passport.authenticate('local-signin',  { successRedirect: '/game',
//                                                     failureRedirect: '/signin'}
//                                                     ));


// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/signin');
// }


// };


