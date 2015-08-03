app.config(function($stateProvider){
  $stateProvider
  .state('checkout.success', {
    url: '/success',
    templateUrl: 'js/checkout/success.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }
    }
    })
})