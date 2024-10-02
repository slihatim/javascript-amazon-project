class Cart {
    #cartItems =  JSON.parse( localStorage.getItem('cart-oop') ) || [];

    removeFromCart(productId){
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
    
        this.saveToLocalStorage();
    }

    saveToLocalStorage(){
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    }

    updateCartQuantity(page){
        let totalCartQuantity = 0;
        this.cartItems.forEach((item) => {
            totalCartQuantity += item.quantity;
        })
    
        if(page === 'amazon')
            document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity;
        
        if(page === 'checkout')
            document.querySelector('.js-return-to-home-link').innerHTML = totalCartQuantity + ' items';
    
    }

    updateQuantity(productId, newQuantity){
        const matchingCartItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingCartItem.quantity = newQuantity;
    
        //updating localStorage
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    }

    updateDeliveryOption(productId, deliveryOptionId){
        const matchingCartItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingCartItem.deliveryOptionId = deliveryOptionId;
    
        //updating localStorage
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    }
}

const cart1 = new Cart();
const cart2 = new Cart();
console.log(cart1.saveToLocalStorage());
console.log('is instance of the class: '+(cart1 instanceof Cart));

