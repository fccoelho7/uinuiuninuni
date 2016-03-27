(function() {
	'use strict';

	angular
		.module('app')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$window'];

	function AuthService($http, $window) {

		var isLogged = false;

		var getUser = function() {
			if ($window.sessionStorage.user) {
				return JSON.parse($window.sessionStorage.user);
			}
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
			isLogged: isLogged,
			getUser: getUser,
			login: login,
			logout: logout,
			register: register
		};
	}

})();
