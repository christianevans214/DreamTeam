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

app.controller('CartController', function($scope, $rootScope, user, UserFactory, CartFactory, AlbumFactory){
  //get the albums
  $scope.user = user;

  $scope.albums = [];

  //use id reference to get album information
  //populate albums array with [album, quantity]
  //if update to cart, reflect in albums array
  $scope.getAlbumInfo = function(currentAlbum, quantity){
    $scope.user.cart.forEach(function(item,idx){
      AlbumFactory.getAlbum(item.album)
      .then(function(album){
        if(currentAlbum){
          if(album._id === currentAlbum[0]._id){
          quantity = quantity;
          }else{ quantity = item.quantity }
        }else{
          quantity = item.quantity
        }
        $scope.albums[idx] = [album, quantity];
      })
    })
  }
  
  
  $scope.getAlbumInfo();

  $scope.cartItems = $scope.albums;

  $scope.deleteFromCart = function(currentAlbum){
    CartFactory.deleteAlbum(currentAlbum, $scope.user);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  $scope.updateCartQuantity = function(currentAlbum, quantity){
    CartFactory.updateQuantity(currentAlbum, $scope.user, quantity);
    $scope.getAlbumInfo(currentAlbum, quantity);
    UserFactory.updateUser($scope.user._id, $scope.user);
  }
  //checkout


})