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
      console.log('user', $scope.user);
      UserFactory.updateUser($scope.user._id, $scope.user)
     .then(function(newUpdatedUser){
        $rootScope.$broadcast("editedCart", newUpdatedUser)
        $state.go('cart')
      })
    } 
    
    // }else{
    //   var items;
    //   var guestCart = localStorageService.get('cart');
    //   if(guestCart === null){
    //     items = [{album: currentAlbum, quantity: 1}];
    //     localStorageService.set('cart', items);
    //   }else{
    //     console.log("guest cart", guestCart)

    //  
    // }
    // $rootScope.$broadcast("editedCart");
    // $state.go('cart');
  };
})