app.config(function($stateProvider) {
	$stateProvider.state('admin.productManagement', {
		url: '/productManagement',
		templateUrl: 'js/admin/substates/productManagement/productManagement.html',
		controller: 'productManagementController'
	})
})

app.controller('productManagementController', function($rootScope, $scope, AlbumFactory, albums) {
	console.log(albums);
	$scope.albums = albums;
	console.log(albums);
	$scope.deleteAlbum = function(id) {
		//front-end deletion of $scope.albums
		$scope.albums = $scope.albums.filter(function(album) {
				if (album._id === id) return false;
				return true;
			})
			//DB deletion of albums
		AlbumFactory.deleteAlbum(id)
			.then(function(response) {
				console.log(response);
			})
	}
})