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

app.controller('AlbumController', function($scope, $rootScope, album, $state, AuthService, UserFactory, CartFactory){
  $scope.album = album;
  AuthService.getLoggedInUser()
  .then(function(user){
    console.log("album controller user:", user);
    $scope.user = user;
  })

  $scope.addToCart = function(currentAlbum){

    if($scope.user){
      CartFactory.addAlbum(currentAlbum._id, $scope.user);
      UserFactory.updateUser($scope.user._id, $scope.user);
      
    }

    $state.go('cart', {id: $scope.currentId});
  }
})