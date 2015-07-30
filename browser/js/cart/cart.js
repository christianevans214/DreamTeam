app.config(function($stateProvider){
  $stateProvider.state('cart', {
    url: '/cart',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html'
    })
})

app.controller('CartController', function($scope, $rootScope){
  //get the albums
  if($rootScope.user){
    $scope.albums = $rootScope.user.cart;
    console.log($rootScope.user.cart)
  }
  else $scope.albums = $rootScope.guestUser;
  
  //delete items

  //remove item that is clicked from cart
  //update the user, without that item
  //yay!

  //edit items quantity

  //visit item detail page

  //checkout


})