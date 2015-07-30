'use strict';

app.config(function($stateProvider){
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  })
})

app.controller('SignupCtrl', function($scope, AuthService, $state){
  $scope.signup = function(userData){
    AuthService.signup(userData)
    .then(function(signedInUser){
      $state.go('home') // {id: signedInUser._id}
    })
    .catch(function(){
      $scope.error = 'Invalid signup credentials.';
    })
  }
})