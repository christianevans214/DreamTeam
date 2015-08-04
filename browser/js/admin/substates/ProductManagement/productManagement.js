app.config(function($stateProvider) {
	$stateProvider.state('admin.productManagement', {
		url: '/productManagement',
		templateUrl: 'js/admin/substates/productManagement/productManagement.html',
		controller: 'productManagementController'
	})
})

app.controller('productManagementController', function($rootScope, $scope, AlbumFactory, albums) {
	$scope.deleteAlbum = function(id) {
		//front-end deletion of $scope.albums
		$rootScope.$broadcast('deletedAlbum', id)
			// $scope.albums = $scope.albums.filter(function(album) {
			// 	if (album._id === id) return false;
			// 	return true;
			// })
			// albums = albums.filter(function(album) {
			// 		if (album._id === id) return false;
			// 		return true;
			// 	})
			//DB deletion of albums
		AlbumFactory.deleteAlbum(id)
			.then(function(response) {
				console.log(response);
			})
	}
})