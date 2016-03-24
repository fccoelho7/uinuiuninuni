(function() {
	'use strict';

	angular
		.module('app')
		.factory('Auth', Auth);

	Auth.$inject = ['$rootScope', '$http'];

	function Auth($rootScope, $http) {

		var _user = {};
		var _isLogged = false;

		function _setUser(data) {
			_user = data;
			_isLogged = true;
			return;
		}

		function _unsetUser() {
			_user = {};
			_isLogged = false;
			return;
		}

		var getUser = function() {
			if (_isLogged) {
				return _user;
			}
			return 'You are not logged!';
		}

		var isLogged = function() {
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
			isLogged: isLogged
		};
	}

})();
