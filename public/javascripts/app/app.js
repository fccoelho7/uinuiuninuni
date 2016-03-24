(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])

		.run(['$rootScope', function($root) {
			$root.$on('$routeChangeStart', function(e, curr, prev) {
				if (curr.$$route && curr.$$route.resolve) {
					// Show a loading message until promises aren't resolved
					$root.loadingView = true;
				}
			});
			$root.$on('$routeChangeSuccess', function(e, curr, prev) {
				// Hide loading message
				$root.loadingView = false;
			});
		}]);

})();
