"use strict"

const baseDeDatos = [
    {
        id: 1,
        name: 'Glasses Coat',
        price: 40.00,
        image: './assets/images/GC01+copy.png',
        category: 'Glasses Coat',
        quantity: 3
    },
    {
        id: 2,
        name: 'Camera Strap',
        price: 20.00,
        image: './assets/images/correa.png',
        category: 'Camera Strap',
        quantity: 5
    },
    {
        id: 3,
        name: 'Briefcase',
        price: 240.00,
        image: './assets/images/Pliego_Trans.png',
        category: 'Briefcase',
        quantity: 4
    },
    {
        id: 4,
        name: 'Portfolio',
        price: 60.00,
        image: './assets/images/cartera.png',
        category: 'Portfolio',
        quantity: 4
    },
    {
        id: 5,
        name: 'Card case',
        price: 30.00,
        image: './assets/images/Classic+Card.png',
        category: 'Card case',
        quantity: 7
    }

]

let carrito = []
const divisa = '$'
const domItems = document.querySelector('#items')
const domCarrito = document.querySelector('#carrito')
const domTotal = document.querySelector('#total')
const domBotonVaciar = document.querySelector('#boton-vaciar')
const miLocalStorage = window.localStorage
const cartCountInfo = document.getElementById('cart-count-info')

let cartItemId= 1

let span = document.querySelector('#cart-count-info')
let contador = 0
const botones = document.querySelectorAll('.btn')
const valorClickProducto = document.getElementsByClassName("btn-primary")
const valorClickQuitar = document.getElementsByClassName("mx-5")
const valorClickVaciar= document.getElementsByClassName("vaciarC")

console.log(cartCountInfo);

let loader = document.querySelector(".loader")
console.log(loader);

window.onload= function(){
    setTimeout(function(){
        loader.classList.add("disppear")
    }, 4000) 
}


const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }

}

showMenu('nav-toggle','nav-menu')

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')

    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

const showCart = (toggleIdCart, navIdCart) =>{
    const toggleCart = document.getElementById(toggleIdCart),
    nav = document.getElementById(navIdCart)

    if(toggleCart && nav){
        toggleCart.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle-cart','nav-cart')

domBotonVaciar.addEventListener("click", ()=>{
    carrito.length=0
    cargarCarrito()
    guardarCarritoEnLocalStorage()
})


function cargarProductos() {
    baseDeDatos.forEach((info) => {

        const addNodo = document.createElement('div')
        addNodo.classList.add('card', 'col-sm-4')

        const nodoCardBody = document.createElement('div')
        nodoCardBody.classList.add('card-body')

        const nodoTitle = document.createElement('h5')
        nodoTitle.classList.add('card-title')
        nodoTitle.textContent = info.name

        const nodoImagen = document.createElement('img')
        nodoImagen.classList.add('img-item')
        nodoImagen.setAttribute('src', info.image)

        const nodoPrecio = document.createElement('p')
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = `${divisa}${info.price}`

        const nodoBoton = document.createElement('button')
        nodoBoton.classList.add('btn', 'btn-primary')
        nodoBoton.textContent = 'Add to cart'
        nodoBoton.setAttribute('marcador', info.id)
        nodoBoton.addEventListener('click', añadirProductoAlCarrito)

        nodoCardBody.appendChild(nodoImagen)
        nodoCardBody.appendChild(nodoTitle)
        nodoCardBody.appendChild(nodoPrecio)
        nodoCardBody.appendChild(nodoBoton)
        addNodo.appendChild(nodoCardBody)
        domItems.appendChild(addNodo)
    });
}


function añadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    cargarCarrito()
    guardarCarritoEnLocalStorage()
}


function cargarCarrito() {
    domCarrito.textContent = ''
    const carritoSinDuplicados = [...new Set(carrito)]
    carritoSinDuplicados.forEach((item) => {
            const nItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item)
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total
        }, 0)
        const cartNodo = document.createElement('li')
        cartNodo.classList.add('list-group-item', 'text-right', 'mx-2')
        cartNodo.textContent = `${numeroUnidadesItem} x ${nItem[0].name} - ${divisa} ${nItem[0].price}`
        const cartBoton = document.createElement('button')
        cartBoton.classList.add('btn', 'btn-danger', 'mx-5')
        cartBoton.textContent = 'X'
        cartBoton.dataset.item = item;
        cartBoton.addEventListener('click', borrarItemCarrito)
        cartNodo.appendChild(cartBoton)
        domCarrito.appendChild(cartNodo)
    });
    domTotal.textContent = calcularTotal()
    cartCountInfo.innerText= carrito.length
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id
    })
    cargarCarrito()
    guardarCarritoEnLocalStorage()
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const mItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item)
        })
        return total + mItem[0].price
    }, 0).toFixed(2)
}


function vaciarCarrito() {

    carrito = []
    
    cargarCarrito()
    localStorage.clear()
}



function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito))
}

function cargarCarritoDeLocalStorage () {

    if (miLocalStorage.getItem('carrito') !== null) {

        carrito = JSON.parse(miLocalStorage.getItem('carrito'))
    }
}


cargarCarritoDeLocalStorage()
cargarProductos()
cargarCarrito()


/*
const valorClickProducto = document.getElementsByClassName("btn-primary")
const valorClickQuitar = document.getElementsByClassName("mx-5")
const valorClickVaciar= document.getElementsByClassName("vaciarC")
*/