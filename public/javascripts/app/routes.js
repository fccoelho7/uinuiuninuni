(function() {
	'use strict';

	angular
		.module('app', ['ngRoute', 'dndLists'])
		.config(appRoutes);

		function appRoutes($routeProvider, $locationProvider) {

			$routeProvider

				.when('/board', {
					templateUrl: 'partials/board.html',
					controller: 'BoardController',
					resolve: {
						user: function(AuthService, $location) {
							return AuthService.getUser()
								.then(function(user) {
									return user.data;
								})
								.catch(function(err) {
									$location.path('/login');
								});
						}
					}
				})

				.when('/login', {
					templateUrl: 'partials/login.html',
					controller: 'UserController',
					resolve: { isLogged: isLogged }
				})

				.when('/register', {
					templateUrl: 'partials/register.html',
					controller: 'UserController',
					resolve: { isLogged: isLogged }
				})

				.when('/logout', {
					resolve: {
						logout: function(AuthService, $location) {
							return AuthService.logout()
								.then(function(data) {
									$location.path('/login');
								});
						}
					}
				})

				.otherwise({
					redirectTo: '/login'
				});

			function isLogged(AuthService, $location) {
				return AuthService.getUser()
					.then(function(user) {
						console.log(user);
						$location.path('/board');
						return;
					})
					.catch(function(err) {
						// console.log(err);
					});
			}

		}

})();
