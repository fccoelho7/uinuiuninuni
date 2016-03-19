(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.config(appRoutes);

		function appRoutes($routeProvider) {

			$routeProvider

				.when('/board', {
					templateUrl: 'views/board.html',
					controller: 'BoardController'
				})

				.otherwise({
					redirectTo: '/',
					templateUrl: 'views/home.html'
				});

		}

})();
