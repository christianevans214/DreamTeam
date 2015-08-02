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

app.controller('AlbumController', function($scope, user, $rootScope, album, $state, AuthService, UserFactory, CartFactory, localStorageService){

  $scope.user = user;
  $scope.album = album;


  $scope.addToCart = function(currentAlbum){
    //if logged in user
    if($scope.user){
      CartFactory.addAlbum(currentAlbum, $scope.user);
      console.log('user', $scope.user);
      UserFactory.updateUser($scope.user._id, $scope.user);
      $state.go('cart');
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