app.config(function($stateProvider){
  $stateProvider.state('albumDetail', {
    url: '/albums/:albumId',
    controller: 'AlbumController',
    templateUrl: 'js/album/album.html',
    resolve: {
      album: function(AlbumFactory, $stateParams) {
        return AlbumFactory.getAlbum($stateParams.albumId);
      }
    }
  })
})

app.controller('AlbumController', function($scope, $rootScope, album, $state, AuthService, UserFactory, CartFactory, localStorageService){

  $scope.album = album;

  AuthService.getLoggedInUser()
  .then(function(user){
    $scope.user = user;
  })

  $scope.addToCart = function(currentAlbum){
    if($scope.user){
      CartFactory.addAlbum(currentAlbum, $scope.user);
      UserFactory.updateUser($scope.user._id, $scope.user)
      $state.go('cart');
/*     .then(function(updatedUser){
        console.log("updatedUser", updatedUser);
        $rootScope.$broadcast("editedCart", updatedUser);
        $state.go('cart');
      })*/
    }else{
      var guestCart = localStorageService.get('cart');
      if(!guestCart){
        guestCart = [{album: currentAlbum, quantity: 1}];
        localStorageService.set('cart', guestCart);
      }else{
        console.log("guest cart", guestCart);
        guestCart.push({album: currentAlbum, quantity: 1});
        localStorageService.set('cart', guestCart);
      }
      $state.go('guestCart');
    }
  };
})