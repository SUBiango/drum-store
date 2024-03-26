const search = (items) => {
    let inputSearch = document.querySelector("[data-search]")

    function handleSearch(e) {
        let value = e.target.value.toLowerCase()
        let productSearch = items.querySelectorAll('.item')
        productSearch.forEach(item => {
            let productName = item.querySelector('.product-name')
            let textContent = productName.textContent.toString().toLowerCase()
            let isVisible = textContent.includes(value)
            item.classList.toggle("hide", !isVisible)
        })
    }
    
    inputSearch.addEventListener("input", handleSearch)
}

export default search;