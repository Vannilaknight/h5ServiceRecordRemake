angular.module('app').controller('arenaCtrl', function($scope, $http) {

    var chart1 = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(chart1).Line(lineChartData, {
        responsive: true
    });
}).filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]).filter('timePlayed', ['$filter', function($filter){
    return function(input){
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