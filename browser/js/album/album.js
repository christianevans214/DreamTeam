app.config(function($stateProvider){
  $stateProvider.state('albumDetail', {
    url: '/albums/:albumId',
    controller: 'AlbumController',
    templateUrl: 'js/album/album.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }, 
      album: function(AlbumFactory, $stateParams){
        //make call to get album info for specific album from server
        return AlbumFactory.getAlbum($stateParams.albumId);
      }
    }
  })
})

app.controller('AlbumController', function($scope, $rootScope, user, album, $state, AuthService, UserFactory, CartFactory, localStorageService, GuestCartFactory){

  $scope.user = user;
  $scope.album = album;


  $scope.addToCart = function(currentAlbum){
    if($scope.user){
      CartFactory.addAlbum(currentAlbum, $scope.user);
      UserFactory.updateUser($scope.user._id, $scope.user)
      .then(function(updatedUser){
        console.log('updated user', updatedUser);
        $state.go('cart');
      })
    }else{
      var guestCart = localStorageService.get('cart');
      if(!guestCart){
        guestCart = [{album: currentAlbum, quantity: 1}];
        localStorageService.set('cart', guestCart);
      }else{
        GuestCartFactory.addAlbum(currentAlbum, guestCart);
        localStorageService.set('cart', guestCart);
      }
      $state.go('guestCart');
    }
  };
})