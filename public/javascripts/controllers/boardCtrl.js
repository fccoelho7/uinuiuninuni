(function() {
	'use strict';

	angular
		.module('app', [])
		.controller(boardCtrl);

		boardCtrl.$injector = ['$scope'];

		function boardCtrl($scope) {
			// $scope.hello = 'Hello World';
		}

})();
