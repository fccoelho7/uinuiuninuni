(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope', '$location'];

	function MainController($scope, $location) {

		$scope.go = function(href) {
			$location.path(href);
		}

	}

})();
