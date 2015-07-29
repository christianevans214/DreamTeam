app.config(function($stateProvider){
  $stateProvider.state('albumDetail', {
    url: '/albums/:albumId',
    controller: 'AlbumController',
    templateUrl: 'js/album/album.html',
    resolve: {
      album: function(AlbumFactory, $stateParams){
        return AlbumFactory.getAlbum($stateParams.albumId);
      }
    }
  })
})

app.controller('AlbumController', function($scope, $rootScope, album, $state, AuthService, UserFactory){
  $scope.album = album;
  AuthService.getLoggedInUser()
  .then(function(user){
    if(!user) $rootScope.guestUser = [];
    else $rootScope.user = user;
  })

  $scope.addToCart = function(currentAlbum){
    if($rootScope.user){
      $rootScope.user.cart.push(currentAlbum);
      UserFactory.updateUser($rootScope.user._id, $rootScope.user);
    } else $rootScope.guestUser.push(currentAlbum);

    $state.go('cart');
  }
})