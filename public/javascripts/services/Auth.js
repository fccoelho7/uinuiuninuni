(function() {
	'use strict';

	angular
		.module('app')
		.factory('Auth', Auth);

	Auth.$inject = ['$rootScope', '$http'];

	function Auth($rootScope, $http) {

		function _setUser(data) {
			$rootScope.user = data;
			$rootScope.user.isLogged = true;
			return;
		}

		function _unsetUser() {
			$rootScope.user = null;
			return;
		}

		var getUser = function() {
			return ($rootScope.user) ? $rootScope.user : 'You are not logged!';
		}

		var isLogged = function() {
			return ($rootScope.user) ? true : false;
		}

		var checkUser = function() {
			return $http.get('/user')
				.then(function(res) {
					_setUser(res.data);
					return true;
				}, function() {
					_unsetUser();
					return false;
				});
		}

		return {
			getUser: getUser,
			isLogged: isLogged,
			checkUser: checkUser
		};
	}

})();
