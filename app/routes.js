module.exports = function(app, passport) {

	var isAuthenticated = function(req, res, next) {
		if (req.isAuthenticated()) { return next() };
		res.redirect('/login');
	}

	app.post('/login',
		passport.authenticate('login', {
			successRedirect: '/account',
			failureRedirect: '/login',
			failureFlash: true
		})
	);

	app.post('/signup',
		passport.authenticate('register', {
			successRedirect: '/account',
			failureRedirect: '/signup',
			failureFlash: true
		})
	);

	app.post('/account',
		passport.authenticate('update', {
			successRedirect: '/account',
			failureRedirect: '/account',
			failureFlash: true
		})
	);

	app.get('/login', function(req, res) {
		if (req.isAuthenticated()) return res.redirect('/account');
		res.render('login', { message: req.flash('message') });
	});

	app.get('/signup', function(req, res) {
		if (req.isAuthenticated()) return res.redirect('/account');
		res.render('register', { message: req.flash('message') });
	});

	app.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	app.get('/account', isAuthenticated, function(req, res){
		res.render('account', { user: req.user });
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
