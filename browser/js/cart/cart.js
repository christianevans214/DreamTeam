app.config(function($stateProvider){
  $stateProvider.state('cart', {
    url: '/cart/',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }
    }
    })
})

app.controller('CartController', function($scope, $rootScope, user, UserFactory, CartFactory){
  //get the albums
  $scope.user = user;
  console.log("user1", $scope.user.cart);
  $scope.cartItems = $scope.user.cart;
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    console.log('user2',$scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }
  //checkout


})