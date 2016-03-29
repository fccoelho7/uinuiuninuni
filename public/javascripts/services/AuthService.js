(function() {
	'use strict';

	angular
		.module('app')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$window'];

	function AuthService($http, $window) {

		var getUser = function() {
			return $http.get('/user');
		}

		var login = function(username, password) {
			return $http.post('/login', {
				username: username,
				password: password
			});
		}

		var register = function(username, password, email) {
			return $http.post('/register', {
				username: username,
				password: password,
				email: email
			});
		}

		var logout = function() {
			return $http.get('/logout');
		}

		return {
			getUser: getUser,
			login: login,
			logout: logout,
			register: register
		};
	}

})();
