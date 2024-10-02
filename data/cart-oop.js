const cart = {
    cartItems: JSON.parse( localStorage.getItem('cart-oop') ) || [],

    removeFromCart: function(productId){
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
    
        this.saveToLocalStorage();
    },

    saveToLocalStorage: function(){
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    updateCartQuantity: function(page){
        let totalCartQuantity = 0;
        this.cartItems.forEach((item) => {
            totalCartQuantity += item.quantity;
        })
    
        if(page === 'amazon')
            document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity;
        
        if(page === 'checkout')
            document.querySelector('.js-return-to-home-link').innerHTML = totalCartQuantity + ' items';
    
    },

    updateQuantity: function(productId, newQuantity){
        const matchingCartItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingCartItem.quantity = newQuantity;
    
        //updating localStorage
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    updateDeliveryOption: function(productId, deliveryOptionId){
        const matchingCartItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingCartItem.deliveryOptionId = deliveryOptionId;
    
        //updating localStorage
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    }
}

console.log(cart);

