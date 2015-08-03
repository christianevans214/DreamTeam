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

app.controller('CartController', function($state, $scope, $rootScope, user, CheckoutFactory, UserFactory, CartFactory, AlbumFactory, localStorageService) {
  //set user
  $scope.user = user;

  //initialize albums array
  $scope.albums = [];

  /*  $rootScope.$on("editedCart", function(event, data) {
      console.log("event caught!", data, event);
      $scope.user = data;
      $scope.$apply();
  
    })

    //use id reference to get album information
    //populate albums array with [album, quantity]
    //if update to cart, reflect in albums array
    $scope.getAlbumInfo = function(currentAlbum, quantity) {
      $scope.user.cart.forEach(function(item, idx) {
        AlbumFactory.getAlbum(item.album)
          .then(function(album) {
            if (currentAlbum) {
              if (album._id === currentAlbum[0]._id) {
                quantity = quantity;
              } else {
                quantity = item.quantity
              }
            } else {
              quantity = item.quantity
            }
            console.log('updating abum info')
              //fix here to grab correct idx?
            $scope.albums[idx] = [album, quantity];
          })
          .then(function() {
            $scope.cartItems = $scope.albums;
          })
      })
    }


    $scope.getAlbumInfo();

    $scope.deleteFromCart = function(currentAlbum) {
      CartFactory.deleteAlbum(currentAlbum, $scope.user);
      // $scope.getAlbumInfo(currentAlbum, 0);
      UserFactory.updateUser($scope.user._id, $scope.user);
    }

    $scope.updateCartQuantity = function(currentAlbum, quantity) {
        CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
        $scope.getAlbumInfo(currentAlbum, quantity);
        UserFactory.updateUser($scope.user._id, $scope.user);
      }
      //checkout

    $scope.checkout = function(cart) {
    })*/
  if ($scope.user) {
    $scope.user.cart.forEach(function(item) {
      console.log("item id", item.album)
      AlbumFactory.getAlbum(item.album)
        .then(function(album) {
          $scope.albums.push({
            album: album,
            quantity: item.quantity
          });
          return album;
        })
        .then(function() {
          $scope.cartItems = $scope.albums;
          console.log("$scope.cartItems", $scope.cartItems)
          $rootScope.$broadcast('loadedItems', $scope.cartItems);
        })
    })
  }



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


  $rootScope.$on('loadedItems', function(event, data) {
    $scope.cartItems = data;
  })


  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum) {
    CartFactory.deleteAlbum(currentAlbum, $scope.user.cart);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //update album from user cart
  $scope.updateCartQuantity = function(currentAlbum, quantity) {
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //checkout
  $scope.checkout = function(cart) {
    CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }

})