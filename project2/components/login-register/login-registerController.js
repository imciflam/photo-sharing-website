"use strict";

cs142App.controller("LoginRegisterController", [
  "$scope",
  "$resource",
  "$location",
  "$http",
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
      LoggedInUser.save({ login_name: $scope.log.loginName }).$promise.then(
        function(loggedInUser) {
          $scope.main.loggedInUser = loggedInUser;
          $scope.main.message = "Hi " + loggedInUser.first_name;
          $location.path("/users/" + loggedInUser._id);
        },
        function(err) {
          alert("error");
        }
      );
    };

    var registeredUser = $resource("/admin/register");

    $scope.register = function() {
      registeredUser
        .save({ login_name: $scope.register.loginName })
        .$promise.then(
          function(registeredUser) {
            $scope.main.registeredUser = registeredUser;
            $scope.main.message = "Hi " + registeredUser.first_name;
            // $location.path("/users/" + registeredUser._id); // can do though gotta double all log flgs
            alert("account created. log in to proceed.");
          },
          function(err) {
            alert("error");
          }
        );
    };
  }
]);
