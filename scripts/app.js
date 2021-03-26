import eCommerceData from './eCommerceData.js';
import toggleModal from './modal.js';
console.log(eCommerceData);

const cartItems = {
    totalPrice: 0,
    products: []
};

const productsContainer = document.querySelector('.preview');
const wallet = document.getElementById('wallet');
const cart = document.querySelector('.cart-icon');

const itemCount = document.querySelector('.item-count');
const productsInCart = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');

const cartDropdown = document.querySelector('.cart-dropdown');
const checkoutBtn = document.querySelector('.dropdown-btn');
wallet.textContent = eCommerceData.wallet;

cart.addEventListener('click', () => {
    cartDropdown.classList.toggle('closed');
});

const checkoutHandler = () => {
    if(cartItems.totalPrice > eCommerceData.wallet) {
        toggleModal('You don\'t have enough money in your wallet! :)');
        return;
    }

    if(cartItems.products.length === 0 && cartItems.totalPrice === 0) {
        toggleModal('You should add something to cart first!');
        return;
    }

    eCommerceData.wallet -= cartItems.totalPrice;

    wallet.textContent = eCommerceData.wallet;
    
    cartItems.products = [];
    cartItems.totalPrice = 0;
    productsInCart.innerHTML = '';
    totalPrice.textContent = `Total price: ${cartItems.totalPrice}`;
    toggleModal('Transaction passed successfully');
}


checkoutBtn.addEventListener('click', checkoutHandler);

const addProductToCart = ({ productImage, productPrice, productTitle }) => {
    const newProduct = document.createElement('div');
    newProduct.classList.add('cart-item');
    newProduct.innerHTML = `
        <img src=${productImage} alt="item"/>
        <div class="item-details">
            <span class="name">${productTitle}</span>
            <span class="price">${productPrice}</span>
        </div>
    `;

    productsInCart.appendChild(newProduct);
};

const addToCartHandler = (productToAdd) => {
    if(!cartItems.products.includes(productToAdd)) {
        cartItems.products.push(productToAdd);
        cartItems.totalPrice += productToAdd.productPrice;
        itemCount.textContent = cartItems.products.length;

        addProductToCart(productToAdd);
        totalPrice.textContent = `Total price: ${cartItems.totalPrice}`;
    } else {
        
        cartItems.totalPrice += productToAdd.productPrice;
        itemCount.textContent = cartItems.products.length++;
        totalPrice.textContent = `Total price: ${cartItems.totalPrice}`;
    }
};

const renderProducts = (product) => {
    const productPreview = document.createElement('div');
    productPreview.classList.add('collection-item');

    productPreview.innerHTML = `
        <div class="image"
        style="background-image: url(${product.productImage})"/>
        <div class="collection-footer">
            <span class="name">${product.productTitle}</span>    
            <span class="price">${product.productPrice}</span>
        </div>
        <button class="custom-btn" id="add-to-cart">Add to cart</button>
    `;

    productPreview.querySelector('button').addEventListener('click', () => addToCartHandler(product));

    return productPreview;
};

const displayProducts = (products) => {
    products.forEach(product => {
        productsContainer.appendChild(renderProducts(product));
    });
};

displayProducts(eCommerceData.products);