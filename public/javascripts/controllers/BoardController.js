(function() {
	'use strict';

	angular
		.module('app')
		.controller('BoardController', BoardController);

	BoardController.$inject = ['$scope', 'BoardService', 'board'];

	function BoardController($scope, BoardService, board) {

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

		$scope.models = (board) ? JSON.parse(board) : boardDefault;

		$scope.addItem = function(listName, item) {
			$scope.models.lists[listName].push({
				label: item.label
			});
		}

		$scope.removeItem = function(listName, $i) {
			$scope.models.lists[listName].splice($i, 1);
		}

		$scope.$watch('models', function(model) {
			BoardService.updateBoard(JSON.stringify(model))
				.success(function(data) {
					// console.info(data);
				})
				.error(function(status, data) {
					console.error(status, data);
				});
		}, true);
	}

})();
