import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import {products} from '../data/products.js';
import { loadProducts } from '../data/products.js';

async function loadPage(){
    await loadProducts();

    renderOrdersGrid();
}
loadPage();

function renderOrdersGrid(){
    let html = '';
    const ordersGrid = document.querySelector('.js-orders-grid');

    orders.forEach((order) => {
        const date = dayjs(order.orderTime).format('MMMM D');
        // console.log(date);

        html += `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${date}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${(order.totalCostCents/100).toFixed(2)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${order.products.map(product => generateProductHTML(product)).join('')}

                    
                </div>
            </div>
        `;

        // console.log(html);
    });

    ordersGrid.innerHTML = html;

    function generateProductHTML(product){
        const arrivingDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');
        let html = `
            <div class="product-image-container">
                <img src="${matchingProduct(product.productId).image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct(product.productId).name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${arrivingDate}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
        `;
        return html;
    }

    function matchingProduct(productId){
        return products.find(product => product.id === productId);
    }
}