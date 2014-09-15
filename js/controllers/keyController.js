'use strict';

masterMapApp.controller('KeyControl', ['$scope', '$rootScope', 
function KeyControl($scope, $rootScope) {

    $scope.$on('navigate', function(event, args) {
        console.log("navigate=" + args);
    });
    $scope.$on('keyPressed', function(event, args) {
        console.log("keyPressed=" + args);
    });
    
    $scope.goLeft=function(){
        $rootScope.$broadcast('navigate', 'goLeft');
    }
    $scope.goUp=function(){
        $rootScope.$broadcast('navigate', 'goUp');
    }
    $scope.goRight=function(){
        $rootScope.$broadcast('navigate', 'goRight');
    }
    $scope.goDown=function(){
        $rootScope.$broadcast('navigate', 'goDown');
    }
    $scope.goTab=function(){
        $rootScope.$broadcast('navigate', 'goTab');
    }
    $scope.goEnter=function(){
        $rootScope.$broadcast('navigate', 'goEnter');
    }
    $scope.goEsc=function(){
        $rootScope.$broadcast('navigate', 'goEsc');
    }
    $scope.goSpace=function(){
        $rootScope.$broadcast('navigate', 'goSpace');
    }
    $scope.handleKeyUp = function(key) {
        this.isActive=false;
    }
    $scope.handleKeyDown = function(key) {
        if(this.isActive){
            return;
        }
        this.isActive=true;
        switch(key){
               case 9:
                    this.goTab();
                    break;
               case 13:
                    this.goEnter();
                    break;
               case 27:
                    this.goEsc();
                    break;
               case 32:
                    this.goSpace();
                    break;
               case 37:
                    this.goLeft();
                    break;
               case 38:
                    this.goUp();
                    break;
               case 39:
                    this.goRight();
                    break;
               case 40:
                    this.goDown();
                    break;
                default:
                    $rootScope.$broadcast('keyPressed', String.fromCharCode(key));
                    break;
        }
    };
}])

.directive('onKeyup', function() {
    return function(scope, elm, attrs) {
        //Evaluate the variable that was passed
        //In this case we're just passing a variable that points
        //to a function we'll call each keyup
        var keyup = scope.$eval(attrs.onKeyup);
        elm.bind('keyup', function(evt) {
            //$apply makes sure that angular knows 
            //we're changing something
            scope.$apply(function() {
                keyup.call(scope, evt.which);
            });
            evt.stopPropagation();
            evt.preventDefault();  
            evt.returnValue = false;
            evt.cancelBubble = true;
        });
    };
})

.directive('onKeydown', function() {
    return function(scope, elm, attrs) {
        //Evaluate the variable that was passed
        //In this case we're just passing a variable that points
        //to a function we'll call each keyup
        var keydown = scope.$eval(attrs.onKeydown);
        elm.bind('keydown', function(evt) {
            //$apply makes sure that angular knows 
            //we're changing something
            scope.$apply(function() {
                keydown.call(scope, evt.which);
            });
            evt.stopPropagation();
            evt.preventDefault();  
            evt.returnValue = false;
            evt.cancelBubble = true;
        });
    };
});
