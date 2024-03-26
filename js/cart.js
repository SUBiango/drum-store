import products from "../products.js";

const cart = () => {
    let iconCart = document.querySelector('.icon-cart');
    let cartTab = document.querySelector('.cart-tab')
    let closeBtn = document.querySelector('.close');

    let cart = []

    iconCart.addEventListener('click', () => {
        cartTab.style.display = 'block';
    })

    closeBtn.addEventListener('click', () => {
        cartTab.style.display = 'none';
    })

    const setProductInCart = (productId, quantity, position) => {
        if (quantity > 0) {
            if (position < 0) {
                cart.push({
                    product_id: productId,
                    quantity: quantity
                })
            } else {
                cart[position].quantity = quantity
            }
        } else {
            cart.splice(position, 1)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        refreshCartHTML()
    }

    const refreshCartHTML = () => {
        let listHTML = document.querySelector('.list-cart')
        let totalHTML = document.querySelector('.icon-cart span')
        let subTotal = document.querySelector('.sub-total')
        let totalPrice = 0
        let totalQuantity = 0;
        listHTML.innerHTML = null;
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity
            let position = products.findIndex((value) => value.id == item.product_id)
            let info = products[position]
            let newItem = document.createElement('div')
            newItem.classList.add('item')
            newItem.innerHTML = 
            `
                <div class="image">
                    <img src="${info.image}" />
                </div>
                <div class="name">${info.name}</div>
                <div class="total-price">${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${info.id}">+</span>
                </div>
            ` 
            listHTML.appendChild(newItem)
            let prices = newItem.querySelectorAll('.total-price')
            prices.forEach(price => {
                totalPrice += parseFloat(price.textContent)
            })
        }) 

        totalHTML.innerText = totalQuantity;
        subTotal.innerText = `Subtotal: ${totalPrice}`;
    }

    // Event click
    document.addEventListener('click', (e) => {
        let buttonClick = e.target
        let productId = buttonClick.dataset.id
        let position = cart.findIndex((value) => value.product_id == productId)
        let quantity = position < 0 ? 0 : cart[position].quantity

        if (buttonClick.classList.contains('add-cart') || buttonClick.classList.contains('plus')) {
            quantity++
            alert("Product added to cart!")
            setProductInCart(productId, quantity, position)
        } else {
            if (buttonClick.classList.contains('minus')) {
                quantity--
                setProductInCart(productId, quantity, position)
            }
        }
    })

    const initApp = () => {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        refreshCartHTML()
    }
    initApp()
}

export default cart;