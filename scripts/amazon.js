import {cart, saveToLocalStorage, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';
const productsGrid = document.querySelector('.js-products-grid');

products.forEach((product) => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${product.formatedPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            ${product.extraInfoHTML()}

            <div class="added-to-cart js-added-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button"
            data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
            `;
    
    productsHTML += html;
})

productsGrid.innerHTML = productsHTML;

let lastTimeoutId = 0;

function addToCart(productId){
    const matchingItem = cart.find((item) => item.productId === productId);

    const quantity = +document.querySelector(`.js-quantity-selector-${productId}`).value;

    if(matchingItem){
        matchingItem.quantity += quantity;
    } else{
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        })
    }

    saveToLocalStorage();
}

//updating cart quantity
updateCartQuantity('amazon');

function addedText(productId){
    const added = document.querySelector(`.js-added-${productId}`);
            added.classList.add("opacity");
            
            if(lastTimeoutId)   clearTimeout(lastTimeoutId);
            lastTimeoutId = setTimeout(() => {
                added.classList.remove("opacity");
            }, 2000);
}

document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            addToCart(productId);

            updateCartQuantity('amazon');

            addedText(productId);

        })
    })