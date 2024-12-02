import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import {products} from '../data/products.js';
import { loadProducts } from '../data/products.js';

async function loadPage(){
    await loadProducts();

    generateTrackingHTML();
}
loadPage();

function renderTracking(){

}

function generateTrackingHTML(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    let html = '';
    if(orderId && productId){
        const mOrder = matchingOrder(orderId);
        const mProduct = matchingProduct(productId);
        const mProduct2 = mOrder.products.find(product => product.productId === productId);

        const orderTime = dayjs(mOrder.orderTime);
        const estimatedDeliveryTime = dayjs(mProduct2.estimatedDeliveryTime);
        const currentTime = dayjs();
        let pourcentage = 0;

        if(orderTime.isAfter(estimatedDeliveryTime)){
            pourcentage = 1;
        } else {
            pourcentage = orderTime.diff(currentTime, 'seconds');
            pourcentage /= orderTime.diff(estimatedDeliveryTime, 'seconds');
            pourcentage *= 100;
            pourcentage = pourcentage.toFixed();
        }

        html += `
            <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
                </a>

                <div class="delivery-date">
                Arriving on ${dayjs(mProduct2.estimatedDeliveryTime).format('dddd, MMMM D')}
                </div>

                <div class="product-info">
                ${mProduct.name}
                </div>

                <div class="product-info">
                Quantity: ${mProduct2.quantity}
                </div>

                <img class="product-image" src="${mProduct.image}">

                <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
                </div>

                <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${pourcentage}%"></div>
                </div>
            </div>
        `;

        document.querySelector('.js-main').innerHTML = html;
    }
}

function matchingOrder(orderId){
    return orders.find(order => order.id === orderId);
}

function matchingProduct(productId){
    return products.find(product => product.id === productId);
}