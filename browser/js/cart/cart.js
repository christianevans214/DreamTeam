app.config(function($stateProvider){
  $stateProvider.state('cart', {
    url: '/cart/:id',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html',
    resolve: {
        user: function(UserFactory, $stateParams){
          console.log($stateParams.id);
          return UserFactory.getUser($stateParams.id);
        }
      }
    })
})

app.controller('CartController', function($scope, $rootScope, user, UserFactory){
  //get the albums
  console.log('user', user);
  user ?  ($scope.userCart = user.cart) : ($scope.userCart = $rootScope.guestUser.cart);
 
  $scope.albums = $scope.userCart;
  console.log('albums', $scope.albums);
  // if($scope.user){
  //   $scope.albums = $scope.user.cart;
  //   console.log($rootScope.user.cart)
  // }
  // else $scope.albums = $rootScope.guestUser;
  
  //delete items

  //remove item that is clicked from cart
  //update the user, without that item
  //yay!

  //edit items quantity

  //visit item detail page

  //checkout


})