app.config(function($stateProvider){
  $stateProvider.state('guestCart', {
    url: '/cart/guest',
    controller: 'GuestCartController',
    templateUrl: 'js/cart/cart.html'
  })
})

app.controller('GuestCartController', function($state, $scope, GuestCartFactory, CartFactory, localStorageService){
  $scope.cartItems = localStorageService.get('cart');
  // console.log("guest cartItems", $scope.cartItems);

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    // console.log("currentAlbum", currentAlbum)
    var index = GuestCartFactory.deleteAlbum(currentAlbum, $scope.cartItems);
    $scope.cartItems.splice(index, 1);
    localStorageService.set('cart', $scope.cartItems);
  }

  //update album from user cart
  $scope.updateCartQuantity = function(currentAlbum, quantity){
    localStorageService.set('cart', $scope.cartItems);
  }

  //checkout
  $scope.checkout = function(cart){
    //CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }

})