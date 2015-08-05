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

app.controller('CartController', function($state, user, $scope, UserFactory, CartFactory, AlbumFactory, localStorageService) {
  $scope.user = user;
  $scope.cartItems = localStorageService.get('userCart');
  console.log("CART", $scope.cartItems)
  $scope.cartItems.forEach(function(item){
    console.log("ITEM", item);
  })

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum) {
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
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.totalPrice = CartFactory.sumPrice($scope.cartItems);

  //checkout
  $scope.checkout = function(cart) {
    $state.go('checkout');
  }

})