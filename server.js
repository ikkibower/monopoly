// Dependencies
// =============================================================
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var db = require("./app/models/");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static directory
app.use(express.static('app/public'));

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// =============================================================

// require('./app/routes/api-routes.js')(app);
// require('./app/routes/html-routes.js')(app);


// Handlebars Routes
var routes = require('./app/controllers/appController.js');
app.use('/', routes);


// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("listening on port %s", PORT);
    });

});

// app.listen(PORT, function() {
//   console.log('App listening on PORT ' + PORT);
// });