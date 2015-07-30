'use strict';

app.config(function($stateProvider){
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  })
})

app.controller('SignupCtrl', function($scope, Authservice, $state){
  // $scope.signup = function(userData){
  //   Auth.signup(userData)
  //   .then()
  // }
})