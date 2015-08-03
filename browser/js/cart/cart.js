app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  })
})

app.controller('CartController', function($state, user, $scope, CheckoutFactory, UserFactory, CartFactory, AlbumFactory, localStorageService) {
  $scope.user = user;
  $scope.cartItems = localStorageService.get('userCart');

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum) {
    // console.log("currentAlbum", currentAlbum)
    var index = CartFactory.deleteAlbum(currentAlbum, $scope.cartItems);
    $scope.cartItems.splice(index, 1);
    $scope.user.cart = $scope.cartItems;
    localStorageService.set('userCart', $scope.cartItems);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //update album from user cart
  $scope.updateCartQuantity = function(currentAlbum, quantity) {
    $scope.user.cart = $scope.cartItems;
    localStorageService.set('userCart', $scope.cartItems);
    console.log('scope use cart', $scope.user.cart);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.checkout = function(cart) {
    //CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }



})