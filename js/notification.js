const showToast = (message) => {
    let toastContainer = document.querySelector('.toast-container')
    let toast = document.createElement('div')
    toast.classList.add('toast')
    toast.innerText = message
    toastContainer.appendChild(toast)

    toast.classList.add('show')
    setTimeout(() => {
        toast.classList.remove('show')
    }, 3000)
}

export default showToast