(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$location', 'AuthService'];

	function UserController($scope, $location, AuthService) {

		$scope.message = null;

		$scope.login = function(username, password) {

			if (username == undefined || password == undefined) {
				console.error('You need complete username and password fields.');
				return;
			}

			AuthService.login(username, password)
				.success(function(data) {
					$location.path('/board');
				})
				.error(function(data, status) {
					$scope.message = data.message;
				});
		}

		$scope.register = function(username, password, email) {
			AuthService.register(username, password, email)
				.success(function(data) {
					$location.path('/board');
				})
				.error(function(data, status) {
					$scope.message = data.message;
				});
		}

	}

})();
