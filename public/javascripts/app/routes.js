(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.config(appRoutes);

		function appRoutes($routeProvider, $locationProvider) {

			$routeProvider

				.when('/board', {
					templateUrl: 'views/board.html',
					controller: 'BoardController',
					resolve: {
						User: User
					}
				})

				.when('/login', {
					templateUrl: 'views/login.html',
					resolve: {
						isLogged: isLogged
					}
				})

				.otherwise({
					redirectTo: '/',
					templateUrl: 'views/home.html'
				});

			function User(Auth, $location) {
				Auth.checkUser()
					.then(function(res) {
						if (!res) {
							$location.path('/login');
							return;
						}
						console.log(Auth.getUser());
						return Auth.getUser();
					});
			}

			function isLogged(Auth, $location) {
				if (Auth.isLogged()) {
					$location.path('/');
					return;
				}
			}

		}

})();
