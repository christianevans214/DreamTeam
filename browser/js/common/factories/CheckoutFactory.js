app.factory("CheckoutFactory", function($http) {
  return {
   //on submit order post transaction in checkout.js
   // postTransaction: function(){
   //  return $http.post('/api/transaction')
   //      .then(function(response) {
   //        return response.data
   //      })
   // },

   getTransaction: function(){
    return $http.get('/api/transaction')
        .then(function(response) {
          return response.data
        })
   }

  }
})