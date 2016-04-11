angular.module('app').controller('warzoneCtrl', function ($scope, $location) {

    if (!$scope.firstPing) {
        $location.path("/");
    } else {
        var newLabels = [];
        var data1 = [];
        var data2 = [];

        for(var i = $scope.recentMatches.length - 1; i >= 0; i--) {
            if($scope.recentMatches[i].GameBaseVariant.name != 'Warzone' && $scope.recentMatches[i].GameBaseVariant.name != 'Warzone Assault') {
                $scope.recentMatches.splice(i, 1);
            }
        }

        $scope.recentMatches.forEach(function (recentMatch) {
            recentMatch.MatchCompletedDate = new Date(recentMatch.MatchCompletedDate.ISO8601Date);
        });

        console.log($scope.recentMatches)
        $scope.recentMatches.sort(function (a, b) {
            return a.MatchCompletedDate - b.MatchCompletedDate;
        });
        console.log($scope.recentMatches)

        for (var i = 0; i < $scope.recentMatches.length; i++) {
            var recentMatch = $scope.recentMatches[i];
            var date = recentMatch.MatchCompletedDate;
            var kill = recentMatch.Players[0].TotalKills;
            var death = recentMatch.Players[0].TotalDeaths;
            newLabels.push(recentMatch.GameBaseVariant.name);
            data1.push(kill);
            data2.push(death);
        }

        var warzoneRecentData = {
            labels: newLabels,
            datasets: [
                {
                    label: "Kills",
                    fillColor: "rgba(0,212,16,0.2)",
                    strokeColor: "rgba(0,212,16,1)",
                    pointColor: "rgba(0,212,16,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(0,212,16,1)",
                    data: data1
                },
                {
                    label: "Deaths",
                    fillColor: "rgba(212, 0, 78, 0.2)",
                    strokeColor: "rgba(212, 0, 78, 1)",
                    pointColor: "rgba(212, 0, 78, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(212, 0, 78, 1)",
                    data: data2
                }
            ]
        };

        var warzoneChart = document.getElementById("warzone-chart").getContext("2d");
        window.myLine = new Chart(warzoneChart).Line(warzoneRecentData, {
            responsive: true,
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });
    }


}).filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]).filter('timePlayed', ['$filter', function ($filter) {
    return function (input) {
        return parseTime(input)
    }
}]);

function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

function parseTime(timestamp) {
    var myString = timestamp;
    var myRegexp = /(PT)(\d+)(H)(\d+)(M)(\d+.\d+)(S)/g;

    var hours = getMatches(myString, myRegexp, 2);
    var minutes = getMatches(myString, myRegexp, 4);
    var seconds = getMatches(myString, myRegexp, 6);

    var newTime = hours + "h, " + minutes + "m, " + Number(seconds).toFixed(0) + "s";

    return newTime;
}