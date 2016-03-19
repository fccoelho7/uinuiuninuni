module.exports = function(passport) {

	var LocalStrategy			= require('passport-local').Strategy
		, FacebookStrategy	= require('passport-facebook').Strategy
		, bCrypt        		= require('bcrypt-nodejs')
		, User         			= require('../models/user')
		, configAuth				= require('./auth');

	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	// Local Strategy

	passport.use('login', new LocalStrategy(
		function(req, username, password, done) {
			User.findOne({ username: username }, function(err, user) {

				if (err) return done(err);

				if (!user) {
					return done(null, false, req.flash('message', 'User incorrect!'));
				}

				if (!isValidPassword(user, password)) {
					return done(null, false, req.flash('message', 'Password incorrect!'));
				}

				return done(null, user);
			});
		}
	));

	passport.use('register', new LocalStrategy(
		function(req, username, password, done) {
			User.findOne({'username':username}, function(err, user) {

				if (err) return done(err);

				if (user) {
					return done(null, false, req.flash('message', 'User exists!'));
				}

				var user = new User({
					username: username,
					password: createHash(password),
					email: req.body.email
				});

				user.save(function(err) {
					if (err) throw err;
					return done(null, user);
				});
			});
		})
	);

	passport.use('update', new LocalStrategy(
		function(req, username, password, done) {
			User.update({'username': username}, req.body, function(err) {

				if (err) throw err;

				return done(null, req.body);
			});
		}
	));

	// Facebook Strategy

	passport.use('facebook', new FacebookStrategy({
			clientID: configAuth.facebookAuth.clientID,
			clientSecret: configAuth.facebookAuth.clientSecret,
			callbackURL: configAuth.facebookAuth.callbackURL
		},
		function(token, refreshToken, profile, done) {
			User.findOne({'facebook.id': profile.id}, function(err, user) {

				if (err) throw err;

				if (user) return done(null, user);

				var user = new User();

				user.name = profile.displayName;
				user.facebook.id = profile.id;
				user.facebook.token = token;

				user.save(function(err) {
					if (err) throw err;
					return done(null, user);
				});

			})
		}

	));

}
