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

app.controller('CartController', function($scope, user, UserFactory, CartFactory, AlbumFactory){
  //get the albums - this process seems very slow currently
  $scope.user = user;

  if(!$scope.albums) $scope.albums = [];
  $scope.user.cart.forEach(function(item){
    console.log("item", item);
    AlbumFactory.getAlbum(item.album)
    .then(function(album){
      $scope.albums.push({album: album, quantity: item.quantity});
      $scope.cartItems = $scope.albums;
      return album;
    })
    .then(function(){
      $scope.$apply();
    })
  })

  
  console.log("user cart", $scope.user.cart);

  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum._id, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    console.log('update quantity',$scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }
  //checkout


})