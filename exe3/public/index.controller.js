/*
* Using angularjs to get emojies from the database for further usage in
* dynamic canvas id allocation and also showing the name
* */

var app = angular.module('index', []);
app.controller('IndexController', function($scope, $http) {
    $http.get('http://localhost:3000/getEmoji').then(function(response){
        $scope.response = response.data;
    })
});