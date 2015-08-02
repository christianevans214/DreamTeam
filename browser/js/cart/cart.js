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

app.controller('CartController', function($state, $scope, $rootScope, user, CheckoutFactory, UserFactory, CartFactory, AlbumFactory, localStorageService){
  //set user
  $scope.user = user;

  //initialize albums array
  $scope.albums = [];


  $scope.getAlbumInfo = function(){
    if($scope.user){
      console.log("scope.user", $scope.user)
      $scope.user.cart.forEach(function(item){
        console.log("item id", item.album)
        AlbumFactory.getAlbum(item.album)
        .then(function(album){
          $scope.albums.push({album: album, quantity: item.quantity});
          return album;
        })
        .then(function(){
          $scope.cartItems = $scope.albums;
          console.log("$scope.cartItems", $scope.cartItems)
          $rootScope.$broadcast('loadedItems', $scope.cartItems);
        })
      })
    }
  }

  $scope.getAlbumInfo();

  $rootScope.$on('loadedItems', function(event, data){
    $scope.cartItems = data;
  })


  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user.cart);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //update album from user cart
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