var app = angular.module('Facts', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/quiz', {
            templateUrl: 'quiz.html'
        }).when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        }).when('/admin', {
            templateUrl: 'admin.html'
        }).when('/users', {
            templateUrl: 'users.html'
        }).when('/signup', {
            templateUrl: 'signup.html',
            controller: 'loginCtrl'
        }).otherwise({
            template: 'You Forgot path......please choose Rigth path'
        })
    }]);

app.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.auth = function () {
        $.ajax({
            url: "/api/login",
            type: "GET",
            success: function (response) {

                for (let i = 0; i < response.length; i++) {
                    if ($scope.email === "ak476024@gmail.com" && $scope.password === "ankkit@123") {
                        $scope.email = '';
                        $scope.password = '';
                        window.location.href = `#/admin`;
                    } else if ($scope.email === response[i].email || $scope.password === response[i].password) {
                        $scope.email = '';
                        $scope.password = '';
                        window.location.href = `#/quiz`;
                    }
                }


            }
        });
    }
    $scope.signup = function () {
        var form_data = {
            email: $scope.email,
            password: $scope.password,
            name: $scope.name,
            phone: $scope.phone
        }
        $http({
            url: '/api/login',
            method: "POST",
            data: form_data,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            $scope.email = '';
            $scope.password = '';
            $scope.name = '';
            $scope.phone = '';
            window.location.href = `#/`;
        });

    }


}])
