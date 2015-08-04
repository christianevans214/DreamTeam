app.config(function($stateProvider){
  $stateProvider
  .state('checkout', {
    url: '/transaction',
    controller: 'CheckoutController',
    templateUrl: 'js/checkout/checkout.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }
    }
  })
})

app.controller('CheckoutController', function($state, AlbumFactory, $scope, user, TransactionFactory, localStorageService, UserFactory){
  $scope.user = user;
  $scope.purchases = [];

  if($scope.user){
    $scope.cartItems = localStorageService.get('userCart');
  } 
  else $scope.cartItems = localStorageService.get('cart');

  $scope.cartItems.forEach(function(item){
    $scope.purchases.push({album: item.album, price: item.album.price, quantity: item.quantity})
  })



  //when place order is clicked -> make post request with form data for user and guest
  $scope.submitCheckout = function(orderData){
    orderData.purchases = $scope.purchases;
    orderData.user = $scope.user;
    if(orderData.shippingMatch){
      orderData.shipping = orderData.billing;
    }
    TransactionFactory.submitTransaction(orderData)
    .then(function(order){
      //update user to store in their transaction history
      if($scope.user){
        if($scope.user.purchaseHistory) $scope.user.purchaseHistory.push(order);
        else $scope.user.purchaseHistory = [order];  
        UserFactory.updateUser($scope.user._id, $scope.user);
      }
      return order;
    })
    // .then(function(order){
    //   order.purchases.forEach(function(purchase, ind){
    //       AlbumFactory.getAlbum(purchase.album)
    //       .then(function(album){
    //         console.log('album', album);
    //         order.purchases[ind].album = album;
    //       })
    //     })
    //   return order;
    // })
    .then(function(order){
      console.log('order', order);
      $scope.sendEmail(order);
    })
    .then(function(){
      //delete local storage
      localStorageService.remove('cart', 'userCart');
      $state.go('success');
    })
  }

  //send conformation email
  $scope.sendEmail = function(order){
    console.log('sendEmailOrder', order);
    TransactionFactory.emailTransaction(order);
  }


})