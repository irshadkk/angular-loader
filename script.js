// Code goes here

var app=angular.module('myApp', ['blockUI']);
 

app.controller('ManualBlockingController', function($scope, blockUI, $timeout, $http, $window) {

  $scope.startBlock = function() {
    blockUI.start();

    $timeout(function() {
      blockUI.stop();
    }, 4000);
  };
 
  $scope.withHttpRequest = function() {

    $http.get('http://jsonplaceholder.typicode.com/posts/1').then(function(data) {
      console.log(data);
    });
  };

  $scope.executeWhenDone = function() {

    blockUI.start();

    blockUI.done(function() {
      $window.alert('BlockUI has finished.');
    });

    $timeout(function() {
      blockUI.stop();
    }, 1000);
  };
}); 


app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                      elm.show();
                    }else{
                       elm.hide()
                    }
                });
            }
        };

    }]);
