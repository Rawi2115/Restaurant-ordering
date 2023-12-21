import menuArray from "./data.js";
const menu = document.getElementById('menu')
const checkout=document.getElementById('checkout')
const checkoutList = document.getElementById('checkout-list')
const totalPrice= document.getElementById('totalprice')
const prices = []
document.addEventListener('click',(e)=>{
    if(e.target.dataset.item){
        handleCheckout(e.target.dataset.item)
        showCheckout()
    }
    if(e.target.id == 'order-confirmation'){
        orderConfirmation()
    }
})
function handleCheckout(itemid){
    const targetObj = menuArray.filter((item)=>{
        return itemid === item.id
    })[0]

    prices.push(targetObj.price)
    checkoutList.innerHTML+=`
    <p>${targetObj.name}<span>$${targetObj.price}</span></p>
    `
    totalPrice.textContent=`
    $${prices.reduce((total,current)=>{
        return total + current
    })}
    `

}

function orderConfirmation(){
    document.getElementById('form').style.display = 'flex'
}
document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = document.getElementById('name');
    const card = document.getElementById('card');
    const cvv = document.getElementById('ccv');
    document.getElementById('form').style.display = 'none'
    checkout.innerHTML = `<p class="message">Thanks ${name.value} for ordering from our restaurant</p>`
    name.value = ''
    card.value = ''
    cvv.value = ''
})

function showCheckout(){
    if(prices.length > 0){
        checkout.style.display = 'block'
    } else {
        checkout.style.display = 'none'
    }
}

function render(){
    for(let item of menuArray){
        menu.innerHTML+=`
        <div class="container">
            <div class="item">
                <img alt="${item.name}" src="${item.img}">
                <div class="description">
                    <h3>${item.name}</h3>
                    <p class="ingredients">${item.ingredients}</p>
                    <p> $${item.price}</p>
                </div>
            </div>
            <i data-item="${item.id}" class="fa-solid fa-circle-plus" style="color: #434a56;"></i>
        </div>
        `
    }
}
render()