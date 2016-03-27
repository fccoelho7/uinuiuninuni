(function() {
	'use strict';

	angular
		.module('app')
		.factory('BoardService', BoardService);

	BoardService.$inject = ['$http'];

	function BoardService($http) {

		var getBoard = function() {
			return $http.get('/user');
		}

		var updateBoard = function(data) {
			return $http.post('/user/board', data);
		}

		return {
			getBoard: getBoard,
			updateBoard: updateBoard
		};
	}

})();
