var User = require('./models/user');

module.exports = function(app, passport) {

	app.post('/login',
		passport.authenticate('login'),
		function(req, res) {
			res.status(200).json({
				id: req.user._id,
				username: req.user.username,
				email: req.user.email
			});
		});

	app.post('/register',
		passport.authenticate('register'),
		function(req, res) {
			res.status(200).json({
				id: req.user._id,
				username: req.user.username,
				email: req.user.email
			});
		});

	app.post('/user/board', function(req, res) {
		if (!req.user) {
			return res.status(401).json({ success: false, message: "You aren't logged!" });
		}

		var board = JSON.stringify(req.body);

		User.update({ '_id': req.user._id }, { board: board }, function(err, data) {
			if (err) {
				return res.status(500).json({ success: false, message: err });
			}
			return res.status(200).json({ success: true, message: 'User succesfull edited!' });
		});

	});

	app.get('/user', function(req, res) {
		if (req.user) {
			return res.status(200).json({
				id: req.user._id,
				username: req.user.username,
				email: req.user.email,
				board: req.user.board,
				isLogged: true
			});
		}
		return res.status(403).json({ error: "You aren't logged!" });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		return res.status(200).json({ success: true, message: 'Bye!' });
	});

	// Facebook Routes

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/account',
			failureRedirect : '/login'
		})
	);

}
