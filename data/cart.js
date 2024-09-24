export let cart = JSON.parse( localStorage.getItem('cart') ) || [];

export function removeFromCart(productId){
    cart = cart.filter((cartItem) => cartItem.productId !== productId);

    saveToLocalStorage();
}

export function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(page){
    let totalCartQuantity = 0;
    cart.forEach((item) => {
        totalCartQuantity += item.quantity;
    })

    if(page === 'amazon')
        document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity;
    
    if(page === 'checkout')
        document.querySelector('.js-return-to-home-link').innerHTML = totalCartQuantity + ' items';

}

export function updateQuantity(productId, newQuantity){
    const matchingCartItem = cart.find((cartItem) => cartItem.productId === productId);
    matchingCartItem.quantity = newQuantity;

    //updating localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}