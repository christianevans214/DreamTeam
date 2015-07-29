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

app.factory('AlbumFactory', function($http){
  return{
    getAlbum: function(id){
      return $http.get('/api/albums/' + id)
      .then(function(res){
        return res.data;
      })
    }
  }
})

app.controller('AlbumController', function($scope, album){
  console.log('here');
  $scope.album = album;
  $scope.hello = "hello";
})