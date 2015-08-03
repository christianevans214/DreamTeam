app.config(function ($stateProvider){
	$stateProvider.state('albumDetail.addReview', {
		url: '/addReview',
		templateUrl: 'js/album/substates/addReview/addReview.html',
		controller: "addReviewController"
	})
})

app.controller('addReviewController', function($scope, user, $state, ReviewFactory, AlbumFactory){

		$scope.newReview = {
			username : user._id
		}

		$scope.submitReview = function(ReviewToSubmit){
			ReviewFactory.createReview(ReviewToSubmit)
			.then(function(revSub){
				$scope.album.review.push(revSub);
				console.log($scope.album)
				return AlbumFactory.updateAlbum($scope.album._id, $scope.album)
			}).then(function(updatedAlbum){
				console.log(updatedAlbum)
			})
		}
	})
