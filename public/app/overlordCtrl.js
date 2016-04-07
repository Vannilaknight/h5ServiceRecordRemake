angular.module('app').controller('overlordCtrl', function ($scope, $location, $http) {
    var socket = io();

    $scope.player = null;

    $http({
        method: 'GET',
        url: '/init'
    }).then(function successCallback(res) {
        console.log('INIT DATA RETREIVED');
        console.log(res.data);
        $scope.player = res.data;
    }, function errorCallback(res) {
        console.log(response)
    });

    socket.on('player-update', function (data) {
        $scope.$apply(function(){
            console.log(data.playerData.recentMatches)
            $scope.player = data.playerData;
        })
    });

    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
});