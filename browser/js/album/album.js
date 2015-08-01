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
      UserFactory.updateUser($scope.user._id, $scope.user);
    }else{
      var items;
      var guestCart = localStorageService.get('cart');
      if(guestCart === null){
        items = [{album: currentAlbum, quantity: 1}];
        localStorageService.set('cart', items);
      }else{
        console.log("guest cart", guestCart)

      }
    }

    $state.go('cart', {id: $scope.currentId});
  }
})