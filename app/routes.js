var User = require('./models/user');

module.exports = function(app, passport) {

	app.get('/', function(err, res) {
		res.render('home');
	});

	app.post('/login', function(req, res, next) {
		passport.authenticate('login', function(err, user, info) {
			if (err) return next(err);
			if (!user) return res.status(401).json(info);
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.status(200).json({ message: 'User logged!' });
			});
		})(req, res, next);
	});

	app.post('/register', function(req, res, next) {
		passport.authenticate('register', function(err, user, info) {
			if (err) return next(err);
			if (!user) return res.status(401).json(info);
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.status(200).json({ message: 'User registered!' });
			});
		})(req, res, next);
	});

	app.post('/user/board', isAuthenticated, function(req, res) {
		var board = JSON.stringify(req.body);
		User.update({ '_id': req.user._id }, { board: board }, function(err, data) {
			if (err) return res.status(500).json({ message: err });
			return res.status(200).json({ message: 'User succesfull edited!' });
		});
	});

	app.get('/user', isAuthenticated, function(req, res) {
		User.findOne({ '_id': req.user._id }, function(err, user) {
			if (err) return res.status(500).json({ message: err });
			return res.status(200).json({
				id: user._id,
				username: user.username,
				email: user.email,
				board: user.board
			});
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		return res.status(200).json({ message: 'Bye!' });
	});

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		return res.status(401).json({ message: 'Not authorized!' });
	}

}
