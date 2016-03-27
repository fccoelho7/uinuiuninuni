(function() {
	'use strict';

	angular
		.module('app', ['ngRoute', 'dndLists'])
		.config();
		// .run(function ($rootScope, $location, AuthService) {
		// 	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		// 		console.log('oi');
		// 		if (nextRoute.access.requiredLogin && !AuthService.isLogged) {
		// 			$location.path('/login');
		// 		}
		// 	});
		// });

})();
