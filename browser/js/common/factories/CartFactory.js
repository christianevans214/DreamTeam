app.factory('CartFactory', function () {
	return {
		addAlbum: function(album, user){
			if(user.cart.length === 0) return user.cart.push({album: album, quantity: 1});
			var match = false;
			user.cart.forEach(function(cartItem){
				if(cartItem.album === album._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			if(!match) return user.cart.push({album: album, quantity: 1});
		},
		deleteAlbum: function(album, cart){
			var index;
			cart.forEach(function(cartItem, idx){
				console.log("idx:", idx, "cartItem:", cartItem);
				if(cartItem.album === album._id) {
					index = idx;
					return;
				}
			});
			cart.splice(index, 1);
		},
		updateQuantity: function(album, user, quantity){
			user.cart.forEach(function(cartItem, idx){
				if(cartItem.album === album._id) {
					user.cart[idx].quantity = quantity;
					return;
				}
			});
		}
	}
})