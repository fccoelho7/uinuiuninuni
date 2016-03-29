(function() {
	'use strict';

	angular
		.module('app')
		.factory('BoardService', BoardService);

	BoardService.$inject = ['$http'];

	function BoardService($http) {

		var updateBoard = function(data) {
			return $http.post('/user/board', data);
		}

		return {
			updateBoard: updateBoard
		};
	}

})();
