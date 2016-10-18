angular.module('myApp', [])
  .controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.cells = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]];

    $scope.calcboard = [0, 0 ,0];

    $scope.player = 1;

    $scope.handleClick = function handleClick(row, col){
      if ($scope.cells[row][col] ===  0) {
        $scope.cells[row][col] = $scope.player;
        $scope.player = -1*$scope.player;
      }
      $scope.winner = ($scope.checkWinner()) ? true : false;
    }


    $scope.checkWinner = function checkWinner(event){
      $scope.calcboard = [0, 0 ,0];
      return ((0 != $scope.checkRow().reduce(function(p, c){
        return p + c
      })) ||
      (0 != $scope.checkCol().reduce(function(p, c){
        return p + c
      })) ||
      ($scope.checkDiagol())) ? true : false
    }

    $scope.checkRow = function checkRow() {
      return $scope.cells.map(function(elem, index) {
        return  (3 === Math.abs(elem.reduce(function(pre, curt){
          return pre + curt
        })))? 1 : 0;
      })
    }

    $scope.checkCol = function checkCol() {
      $scope.cells.forEach(function(elem, index) {
        elem.forEach(function(el, idx){
          $scope.calcboard[idx] += $scope.cells[index][idx];
        })
      });
      return $scope.calcboard.map(function(elem, index) {
        return Math.abs(elem) === 3 ? 1 : 0
      })
    }

    $scope.checkDiagol = function checkDiagol() {
      if (3 === Math.abs($scope.cells[0][0] + $scope.cells[1][1] + $scope.cells[2][2])) {
        return true
      } else if (3 === Math.abs($scope.cells[0][2] + $scope.cells[1][1] + $scope.cells[2][0])) {
        return true
      } else {
        return false
      }
    }


  }])
