const addToCartButtons = document.querySelectorAll('.shop-item-button')
const removeCartItemButtons = document.querySelectorAll('.btn-danger')
const quantityInputs = document.querySelectorAll('.cart-quantity-input')
const cartTotalPrice = document.querySelector('.cart-total-price')
const purchaseButton = document.querySelector('.btn-purchase')

removeCartItemButtons.forEach(button => {
  button.addEventListener('click', removeCartItem)
})

quantityInputs.forEach(input => {
  input.addEventListener('change', quantityChanged)
})

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCartClicked)
})

purchaseButton.addEventListener('click', purchaseClicked)

function removeCartItem(event) {
  const buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  const input = event.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  const button = event.target
  const shopItem = button.parentElement.parentElement
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function purchaseClicked() {
  const cartItems = document.getElementsByClassName('cart-items')[0]

  if(cartTotalPrice.innerText == '$0.00') {
    alert('The cart is empty!!')
    return
  } else {
    alert('Thank you for your purchase')    

    while(cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
  }
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const cartItemNames = cartItems.querySelectorAll('.cart-item-title')
  for(var i = 0; i < cartItemNames.length; i++) {
    if(cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    } 
  }

  const cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  const cartItemContainer = document.querySelectorAll('.cart-items')[0]
  const cartRows = cartItemContainer.querySelectorAll('.cart-row')
  var total = 0

  cartRows.forEach(cartRow => {
    const priceElement = cartRow.getElementsByClassName('cart-price')[0]
    const quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0]
    const price = parseFloat(priceElement.innerText.replace('$', ''))
    const quantity = quantityElement.value

    total = total + (price * quantity)
  })
  
  cartTotalPrice.innerText = '$' + total.toFixed(2)
  
}
