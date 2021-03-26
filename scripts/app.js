import eCommerceData from './eCommerceData.js';
console.log(eCommerceData);

const productsContainer = document.querySelector('.preview');

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
        <button class="add-to-cart-btn">Add to cart</button>
    `;

    return productPreview;
};

const displayProducts = (products) => {
    products.forEach(product => {
        productsContainer.appendChild(renderProducts(product));
    });
};

displayProducts(eCommerceData.products);