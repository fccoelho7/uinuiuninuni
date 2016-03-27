(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$location', '$window', 'AuthService'];

	function UserController($scope, $location, $window, AuthService) {

		$scope.user = AuthService.getUser();

		$scope.login = function(username, password) {

			if (username == undefined || password == undefined) {
				console.error('You need complete username and password fields.');
				return;
			}

			AuthService.login(username, password)
				.success(function(data) {
					AuthService.isLogged = true;
					$window.sessionStorage.user = JSON.stringify(data);
					$location.path('/board');
				})
				.error(function(status, data) {
					console.error(status, data);
				});
		}

		$scope.register = function(username, password, email) {
			AuthService.register(username, password, email)
				.success(function(data) {
					AuthService.isLogged = true;
					$window.sessionStorage.user = JSON.stringify(data);
					$location.path('/board');
				})
				.error(function(status, data) {
					console.error(status, data);
				});
		}

	}

})();
