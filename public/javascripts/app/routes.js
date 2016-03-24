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
					templateUrl: 'views/login.html'
				})

				.otherwise({
					redirectTo: '/',
					templateUrl: 'views/home.html'
				});

			function User(Auth, $location) {
				Auth.isLogged()
					.then(function(res) {
						if (!res) {
							return $location.path('/login');
						}
					});
			}

		}

})();
