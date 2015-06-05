(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnAwareService, ColumnOptionProvider, $timeout){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            controller: function($scope, $timeout){

            },
            link: function($scope){
                $scope.columnIndex = $scope.$parent.cellIndex;

                ColumnAwareService.subscribeToOptionListChange(function(value){
                    $timeout(function(){
                        $scope.alignRule = value[$scope.columnIndex].alignRule;
console.log(value[$scope.columnIndex].alignRule);
                        $scope.columnClass = getColumnClass($scope.alignRule);
                    }, 1000);
                });

                $scope.$parent.cellIndex++;

                function getColumnClass(a) {
                    console.log(a);
                    if (a === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());