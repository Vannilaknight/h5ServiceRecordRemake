angular.module('app').controller('overlordCtrl', function ($scope, $location, $http) {
    var socket = io();

    $scope.profileData = null;
    $scope.firstPing = false;

    socket.on('player-update', function (data) {
        $scope.firstPing = true;
        $scope.$apply(function(){
            $scope.profileData = data.profileData;
            $scope.warzoneData = data.warzoneData;
            $scope.arenaData = data.arenaData;
            $scope.recentMatches = data.recentMatches;
        })
    });



    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
});