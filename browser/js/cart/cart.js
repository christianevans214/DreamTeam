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


/*app.controller('CartController', function($scope, user, UserFactory, CartFactory, AlbumFactory){
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
    CartFactory.deleteAlbum(currentAlbum._id, $scope.user);*/

app.controller('CartController', function($state, $scope, $rootScope, user, CheckoutFactory, UserFactory, CartFactory, AlbumFactory, localStorageService){
  //set user
  $scope.user = user;
  console.log("cart user", $scope.user);
  //initialize albums array
  $scope.albums = [];

/*  $rootScope.$on("editedCart", function(event, data) {
    console.log("event caught!", data, event);
    $scope.user = data;
    $scope.$apply();
  })*/

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



  //iterate through user cart and populate albums
/*  $scope.getAlbumInfo = function(){
    $scope.user.cart.forEach(function(item){
      AlbumFactory.getAlbum(item.album)
      .then(function(album){
        $scope.albums.push({album: album, quantity: item.quantity});
        return album;
      })
      .then(function(){
        $scope.cartItems = $scope.albums;
        console.log("$scope.cartItems", $scope.cartItems)
        $rootScope.$broadcast('loadedItems', $scope.cartItems)
      })
    })
  }*/


  $rootScope.$on('loadedItems', function(event, data){
    $scope.cartItems = data;
  })


  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user.cart);
    UserFactory.updateUser($scope.user._id, $scope.user);
    $rootScope.$apply();
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