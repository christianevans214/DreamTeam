app.config(function($stateProvider){
  $stateProvider.state('cart', {
    url: '/cart',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html',
    resolve: {
        user: function(AuthService){
          return AuthService.getLoggedInUser();
        }
      }
    })
})

app.controller('CartController', function($state, $scope, $rootScope, user, CheckoutFactory, UserFactory, CartFactory, AlbumFactory){
  
  $scope.user = user;

  // $scope.addAlbumInfo = function(){
 
    
  // };

  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }
  //checkout

  $scope.checkout = function(cart){
    CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }


})