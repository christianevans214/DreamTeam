app.config(function($stateProvider) {
  $stateProvider.state('albumDetail', {
    url: '/albums/:albumId',
    controller: 'AlbumController',
    templateUrl: 'js/album/album.html',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      album: function(AlbumFactory, $stateParams) {
        //make call to get album info for specific album from server
        return AlbumFactory.getAlbum($stateParams.albumId);
      }
    }
  })
})

app.controller('AlbumController', function($scope, $rootScope, user, album, $state, UserFactory, AuthService, CartFactory, localStorageService) {


  $scope.user = user;
  $scope.album = album;

  $scope.addToCart = function(currentAlbum) {
    if ($scope.user) {
      var userCart = localStorageService.get('userCart');
      if (!userCart) {
        userCart = [{
          album: currentAlbum,
          quantity: 1
        }];
        localStorageService.set('userCart', userCart);
      } else {
        CartFactory.addAlbum(currentAlbum, userCart);
        localStorageService.set('userCart', userCart);
      }
      $scope.user.cart = userCart;

      UserFactory.updateUser($scope.user._id, $scope.user)
        .then(function(updatedUser) {
          $state.go('cart');
        })
    } else {
      var guestCart = localStorageService.get('cart');
      if (!guestCart) {
        guestCart = [{
          album: currentAlbum,
          quantity: 1
        }];
        localStorageService.set('cart', guestCart);
      } else {
        CartFactory.addAlbum(currentAlbum, guestCart);
        localStorageService.set('cart', guestCart);
      }
      $state.go('guestCart');
    }
  };
})