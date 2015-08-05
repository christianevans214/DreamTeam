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

app.controller('CheckoutController', function($state, $scope, user, TransactionFactory, localStorageService, UserFactory, PromotionsFactory, CartFactory){
  $scope.user = user;
  $scope.purchases = [];

  //set default of country to us:
  $scope.defaultCountry = "United States";

  if($scope.user){
    $scope.cartItems = localStorageService.get('userCart');
  } 
  else $scope.cartItems = localStorageService.get('cart');

  $scope.cartItems.forEach(function(item){
    $scope.purchases.push({album: item.album, price: item.album.price, quantity: item.quantity})
  })


  $scope.getGenres = function(genresArr){
    return genresArr[0].split(' ');
  }

  //TODO: FIX FOR NEW PROMOS
  $scope.applyPromo = function(promoCode, purchase){
    if(promoCode === "BOGO"){
      console.log("BOGO");
    } else if(promoCode === "FREE"){
      purchase.price = 0;
    } else if(promoCode === "10%OFF"){
      purchase.price = purchase.price*(0.9);
    } else if(promoCode === "25%OFF"){
      purchase.price = purchase.price*(0.75);
    } else if(promoCode === "50%OFF"){
      purchase.price = purchase.price*(0.5);
    }
    return purchase;
  }


  $scope.checkPromo = function(promo){
    console.log("PROMO", promo);
    var valid = false;
    PromotionsFactory.getAllPromotions()
    .then(function(validPromos){
      valid = validPromos.filter(function(validPromo){
        return (promo.toLowerCase() === validPromo.code.toLowerCase() && (new Date(validPromos[0].expireAt) - new Date()) > 0);
      })

      if(valid.length === 1){
        $scope.purchases.forEach(function(item){
          console.log("purchase items", item)
          var genres = $scope.getGenres(item.album.genre)
          for(var i = 0; i < genres.length; i++){
            if(valid[0].validProducts.indexOf(genres[i]) > -1){
              $scope.applyPromo(valid[0].code, item);
            }
          }
        })
        console.log("purchases", $scope.purchases);
        //$scope.cartItems = $scope.purchases;
      }
    })

    //NOTE: IF PROMO IS EXPIRED REMOVE FROM DATABASE!
  }

  //UPDATE QUANTITY
  $scope.totalPrice = CartFactory.sumPrice($scope.cartItems);

  //when place order is clicked -> make post request with form data for user and guest
  $scope.submitCheckout = function(orderData){
    console.log("ORDER DATA");
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
    .then(function(order){
      console.log('order', order);
      $scope.sendEmail(order);
    })
    .then(function(){
      //delete local storage
      localStorageService.remove('cart', 'userCart');
      $state.go('account.shoppingHistory', {id: user._id});
    })
  }

  //send conformation email
  $scope.sendEmail = function(order){
    console.log('sendEmailOrder', order);
    TransactionFactory.emailTransaction(order);
  }
})













