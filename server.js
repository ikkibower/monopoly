// Dependencies
// =============================================================
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var morgan= require('morgan');
var passport = require('passport');
var session = require('express-session');


var db = require("./app/models/");





// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// require('./app/config/passport.js')(passport, db.User);


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Cookie-Parser / Express Validator
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(expressValidator([]));



// Static directory
app.use(express.static('app/public'));

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());


// Routes
// =============================================================

    //load passport strategies
    require('./app/config/passport.js')(passport,db.user);

// require('./app/routes/api-routes.js')(app);
// require('./app/routes/html-routes.js')(app);


// Handlebars Routes
var routes = require('./app/controllers/appController.js');
app.use('/', routes);


// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("🌎 listening on port %s", PORT);
        console.log(db.User);
        console.log(db.Property);
    });

});

// app.listen(PORT, function() {
//   console.log('App listening on PORT ' + PORT);
// });