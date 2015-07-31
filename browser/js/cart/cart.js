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
  console.log("user", $scope.user.cart);
  $scope.cartItems = $scope.user.cart;
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  // if($scope.user){
  //   $scope.albums = $scope.user.cart;
  //   console.log($rootScope.user.cart)
  // }
  // else $scope.albums = $rootScope.guestUser;
  
  //delete items

  //remove item that is clicked from cart
  //update the user, without that item
  //yay!

  //edit items quantity

  //visit item detail page

  //checkout


})