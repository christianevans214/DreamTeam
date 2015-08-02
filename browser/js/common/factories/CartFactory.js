app.factory('CartFactory', function () {
	return {
		addAlbum: function(albumToAddToCart, user){
			//if nothing in cart, push album to cart
			if(user.cart.length === 0) return user.cart.push({album: albumToAddToCart, quantity: 1});
			var match = false;
			user.cart.forEach(function(cartItem, idx){
				console.log('album', albumToAddToCart);
				console.log('cartItem', cartItem);
				console.log('idx', idx);
				//if album already in cart, increase quantity
				if(cartItem.album._id === albumToAddToCart._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			//if album not in cart, push album to cart
			if(!match){ 
				user.cart.push({album: albumToAddToCart, quantity: 1});
			}
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