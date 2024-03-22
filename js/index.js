 import cart from "./cart.js"
 import products from "../products.js"
 
 let app = document.getElementById('app')
 let temporaryContent = document.getElementById('temporary-content')

 const loadTemplate = () => {
    fetch('/template.html')
        .then(response => response.text()) 
        .then(html => {
            console.log(html)
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
    let listProduct = document.querySelector('.list-product')
    listProduct.innerHTML = null;
    products.forEach(product => {
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