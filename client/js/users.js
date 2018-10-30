angular
    .module("Facts")
    .controller("userCtrl", ["$scope", "$http",
        UserController
    ]);
function UserController($scope, $http) {

    $scope.users = [];


    $scope.reset = function () {
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.password = '';
    }
    $scope.showUser = function () {
        $http(
            {
                method: 'GET',
                url: '/api/login'
            }).then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) { });
    }
    $scope.addUser = function () {
        var form_data = {
            name: $scope.name,
            phone: $scope.phone,
            email: $scope.email,
            password: $scope.password
        }
        $http({
            url: '/api/login',
            method: "POST",
            data: form_data,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            $scope.users.push(response.data);
            $scope.reset();
        });
    }

    $scope.delUser = function (index, id) {
        $http({
            url: `/api/login/${id}`,
            method: "DELETE"
        }).then(function () {
            $scope.users.splice(index, 1);
        })
    }
    $scope.edituser = function (user) {
        $scope.name = user.name
        $scope.phone = user.phone
        $scope.id = user._id;
        $scope.email = user.email;
        $scope.password = user.password;
    }
    $scope.updateUser = function (id) {
        var form_data = {
            name: $scope.name,
            phone: $scope.phone,
            email: $scope.email,
            password: $scope.password
        }
        $http({
            url: `/api/login/${id}`,
            method: "PUT",
            data: form_data,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            $scope.reset();
            $scope.showUser();
        })
    }


}
