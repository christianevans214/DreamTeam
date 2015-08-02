app.factory('CartFactory', function () {
	return {
		addAlbum: function(album, user){
			if(user.cart.length === 0) return user.cart.push({album: album, quantity: 1});
			var match = false;
			user.cart.forEach(function(cartItem, idx){
				// console.log("idx:", idx, "album:", cartItem);
				if(cartItem.album === album._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			if(!match) return user.cart.push({album: album, quantity: 1});
			// console.log("user cart:", user.cart);
		},
		deleteAlbum: function(album, user){
			var index;
			user.cart.forEach(function(cartItem, idx){
				console.log("idx:", idx, "cartItem:", cartItem);
				console.log('album', album);
				if(cartItem.album === album._id) {
					index = idx;
					return;
				}
			});
			user.cart.splice(index, 1);
		},
		updateQuantity: function(album, user, quantity){
			user.cart.forEach(function(cartItem, idx){
				if(cartItem.album === album[0]._id) {
					user.cart[idx].quantity = quantity;
					// cartItem.quantity = quantity;
				}
			});
		}
	}
})