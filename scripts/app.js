import eCommerceData from './eCommerceData.js';
console.log(eCommerceData);

const productsContainer = document.querySelector('.preview');
const wallet = document.getElementById('wallet');
const cart = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');

const itemCount = document.querySelector('.item-count');
const productsInCart = document.querySelector('.cart-items');

const cartItems = {
    totalPrice: 0,
    products: []
};

cart.addEventListener('click', () => {
    cartDropdown.classList.toggle('closed');
});

wallet.textContent = eCommerceData.wallet;

const addProductToCart = (productToAdd) => {
    const newProduct = document.createElement('div');
    newProduct.classList.add('cart-item');
    newProduct.innerHTML = `
        <img src=${productToAdd.productImage} alt="item"/>
        <div class="item-details">
            <span class="name">${productToAdd.productTitle}</span>
            <span class="price">${productToAdd.productPrice}</span>
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
        console.log(cartItems);
    } else {

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