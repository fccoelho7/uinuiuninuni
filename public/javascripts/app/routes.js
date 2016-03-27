(function() {
	'use strict';

	angular
		.module('app', ['ngRoute', 'dndLists'])
		.config(appRoutes);

		function appRoutes($routeProvider, $locationProvider) {

			$routeProvider

				.when('/board', {
					templateUrl: 'views/board.html',
					controller: 'BoardController',
					resolve: {
						user: function(AuthService, $location) {
							if (!AuthService.isLogged) {
								$location.path('/login');
								return;
							}
						},
						board: function(BoardService) {
							return BoardService.getBoard()
								.then(function(user) {
									return user.data.board;
								});
						}
					}
				})

				.when('/login', {
					templateUrl: 'views/login.html',
					controller: 'UserController',
					resolve: { isLogged: isLogged }
				})

				.when('/register', {
					templateUrl: 'views/register.html',
					controller: 'UserController',
					resolve: { isLogged: isLogged }
				})

				.when('/logout', {
					resolve: {
						logout: function(AuthService, $window, $location) {
							return AuthService.logout()
								.then(function(data) {
									if (AuthService.isLogged) {
										AuthService.isLogged = false;
										delete $window.sessionStorage.user;
									}
									$location.path('/login');
								});
						}
					}
				})

				.otherwise({
					redirectTo: '/login'
				});

			function isLogged(AuthService, $location) {
				if (AuthService.isLogged) {
					$location.path('/board');
					return;
				}
			}

		}

})();
