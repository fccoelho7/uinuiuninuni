(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope'];

	function MainController($scope) {
		$scope.hello = "Home :)"
	}

})();
