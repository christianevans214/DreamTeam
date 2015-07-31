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

app.controller('CartController', function($scope, $rootScope, user, UserFactory, CartFactory, AlbumFactory, albums){
  //get the albums
  console.log("resolve albums", albums)
  $scope.user = user;

  $scope.albums = [];
  $scope.user.cart.forEach(function(item){
    AlbumFactory.getAlbum(item.album)
    .then(function(album){
      $scope.albums.push(album);
      console.log("albums", $scope.albums);
    })
  })
  


  console.log("albums out of .then", $scope.albums);

  console.log("user in cart", $scope.user.cart);
  $scope.cartItems = $scope.user.cart;
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    console.log('update quantity',$scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }
  //checkout


})