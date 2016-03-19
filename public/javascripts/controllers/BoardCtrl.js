(function() {
	'use strict';

	angular
		.module('app')
		.controller('BoardController',BoardController);

		BoardController.$inject = ['$scope'];

		function BoardController($scope) {
			$scope.hello = '/Board :)';
		}

})();
