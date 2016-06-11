(function() {
	'use strict';

	angular
		.module('app')
		.controller('BoardController', BoardController);

	BoardController.$inject = ['$scope', 'BoardService', 'user'];

	function BoardController($scope, BoardService, user) {

		// generateMessages();

		var boardDefault = {
			selected: null,
			lists: {
				"UI": [
					{label: 'Tarefas que são urgentes e importantes.'}
				],
				"NUI": [
					{label: 'Tarefas não urgentes, mas importantens.'}
				],
				"UNI": [
					{label: 'Tarefas urgentes mas não importantes.'}
				],
				"NUNI": [
					{label: 'Tarefas que não são nem urgentes e nem importantes.'}
				]
			}
		};

		$scope.user = user.username;
		$scope.models = (user.board) ? JSON.parse(user.board) : boardDefault;

		$scope.addItem = function(prop, item) {
			$scope.models.lists[prop].push({
				label: item.label,
				expires: new Date(item.expires).getTime()
			});
		}

		$scope.removeItem = function(prop, $i) {
			$scope.models.lists[prop].splice($i, 1);
		}

		$scope.$watch('models', function(model) {
			BoardService.updateBoard(angular.toJson(model))
				.success(function(data) {
					console.log(data.message);
				})
				.error(function(status, data) {
					console.error(status, data);
				});
		}, true);

		// function generateMessages() {
		// 	var board = angular.fromJson(user.board)
		// 	  , lists = board.lists
		// 	  , arr   = [];
		//
		// 	for (var prop in lists) {
		// 		for (var val in lists[prop]) {
		// 			var item 		 = lists[prop][val]
		// 				, expires  = item.expires
		// 				, now  		 = new Date().getTime()
		// 				, ONE      = (86400 * 1000)
		// 				, TWO      = (172800 * 1000)
		// 			;
		//
		// 			if (expires > now) {
		//
		// 				if (expires < (now + ONE)) {
		// 					item.status = 1;
		// 					arr.push(item);
		// 				}
		//
		// 				if (expires > (now + ONE) && expires < (now + TWO)) {
		// 					item.status = 2;
		// 					arr.push(item);
		// 				}
		// 			}
		// 		}
		// 	}
		//
		// 	return $scope.messages = arr;
		// }
	}

})();
