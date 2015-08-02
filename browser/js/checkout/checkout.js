app.config(function($stateProvider){
  $stateProvider
  .state('checkout', {
    url: '/transaction',
    controller: 'CheckoutController',
    templateUrl: 'js/checkout/checkout.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }
    }
    })
})

app.controller('CheckoutController', function($scope, user){
  $scope.hello = "hello";

})