app.config(function($stateProvider){
  $stateProvider.state('cart.guest', {
    url: '/guest',
    controller: 'CartGuestController',
    templateUrl: 'js/cart/cart.html'
  })
})

app.controller('CartGuestController', function($state, $scope, $rootScope, user, CheckoutFactory, CartFactory, AlbumFactory, localStorageService){
  $scope.cartItems = localStorageService.get('cart');

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.cartItems);
    localStorageService.remove('cart', currentAlbum);

  }

  //update album from user cart
  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
  }

  //checkout
  $scope.checkout = function(cart){
    CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }

})