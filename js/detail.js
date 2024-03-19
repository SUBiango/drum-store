import products from "../products.js";
import cart from "./cart.js";

const loadTemplate = () => {
    fetch('/template.html')
        .then(response => response.text()) 
        .then(html => {
            app.innerHTML = html
            let contentTab = document.getElementById('content-tab')
            contentTab.innerHTML = temporaryContent.innerHTML
            temporaryContent.innerHTML = null;
            cart()
            initApp()
        })
        .catch(error => {
            console.log("Error fetching data", error)
        })
 }

 loadTemplate()

 const initApp = () => {
    let productId = new URLSearchParams(window.location.search).get('id')
    let info = products.filter((value) => value.id == productId)[0]
    if (!info) {
        window.location.href="/"
    }

    let detail = document.querySelector('.detail')
    detail.querySelector('.image img').src = info.image;
    detail.querySelector('.name').innerText = info.name;
    detail.querySelector('.price').innerText = '$' + info.price
    detail.querySelector('.description').innerText = info.description
    detail.querySelector('.add-cart').dataset.id = productId

    // Similar Products

    let listProduct = document.querySelector('.list-product')
    listProduct.innerHTML = null;
    products.filter((value) => value.id != productId).forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item')
        newProduct.innerHTML = 
        `   
            <a href="/detail.html?id=${product.id}">
                <img src="${product.image}"/>
            </a>
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button class="add-cart" data-id="${product.id}">
                Add To Cart
            </button>
        `
        listProduct.appendChild(newProduct)
    })
 }
