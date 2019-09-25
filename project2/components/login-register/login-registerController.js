"use strict";

cs142App.controller("LoginRegisterController", [
  "$scope",
  "$resource",
  "$location",
  function($scope, $resource, $location) {
    $scope.log = {
      loginName: "",
      password: ""
    };

    $scope.register = {
      loginName: "",
      password: "",
      confirmPassword: ""
    };

    var LoggedInUser = $resource("/admin/login");

    $scope.login = function() {
      console.log($scope);
      LoggedInUser.save({ login_name: $scope.log.loginName }).$promise.then(
        function(loggedInUser) {
          $scope.main.loggedInUser = loggedInUser;
          $scope.main.message = "Hi " + loggedInUser.first_name;
          $location.path("/users/" + loggedInUser._id);
        },
        function(err) {
          $scope.main.message = "Hi " + err.resource.login_name;
          console.log(err.resource.login_name);
          $location.path("/users/5d8b34a2db73143eb4e38295");
        }
      );
    };

    var registeredUser = $resource("/admin/register");

    $scope.register = function() {
      console.log($scope.register.loginName);
      registeredUser
        .save({ login_name: $scope.register.loginName })
        .$promise.then(
          function(registeredUser) {
            console.log(registeredUser);
            $scope.main.registeredUser = registeredUser;
            $scope.main.message = "Hi " + registeredUser.first_name;
            $location.path("/users/" + registeredUser._id);
          },
          function(err) {
            console.log(err.resource.login_name);
          }
        );
    };
  }
]);
