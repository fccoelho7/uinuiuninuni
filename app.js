'use strict';

var express     = require('express')
	, app           = express()
	, port          = process.env.PORT || 8080
	, configD      = require('./app/config/db')
	, bodyParser    = require('body-parser')
	, morgan        = require('morgan')
	, mongoose      = require('mongoose')
	, session       = require('express-session')
	, passport      = require('passport')
	, flash         = require('connect-flash');

// Database Config
mongoose.connect(configD.url);

//Passport Config
require('./app/config/passport')(passport);

// Set up Express Application
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Jade
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Auth
app.use(session({
	secret: 'cookie_secret',
	saveUninitialized: true,
	resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.get('/', function(err, res) {
	res.render('home', {});
});
require('./app/routes')(app, passport);

// Listen
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
