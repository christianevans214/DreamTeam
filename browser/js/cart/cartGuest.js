app.config(function($stateProvider){
  $stateProvider.state('guestCart', {
    url: '/cart/guest',
    controller: 'GuestCartController',
    templateUrl: 'js/cart/cart.html'
  })
})

app.controller('GuestCartController', function($scope, GuestCartFactory, CartFactory, localStorageService){
  $scope.cartItems = localStorageService.get('cart');
  console.log("guest cartItems", $scope.cartItems);

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    console.log("currentAlbum", currentAlbum)
    GuestCartFactory.deleteAlbum(currentAlbum, $scope.cartItems);
    localStorageService.remove('cart', currentAlbum._id);
    //localStorageService.clearAll(/currentAlbum._id/);
  }

  //update album from user cart
/*  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
  }*/

  //checkout
/*  $scope.checkout = function(cart){
    CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }*/

})