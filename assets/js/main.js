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

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;
const cartCountInfo = document.getElementById('cart-count-info')

let cartItemId= 1;

let span = document.getElementById('cart-count-info')



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


function cargarProductos() {
    baseDeDatos.forEach((info) => {

        const addNodo = document.createElement('div');
        addNodo.classList.add('card', 'col-sm-4');

        const NodoCardBody = document.createElement('div');
        NodoCardBody.classList.add('card-body');

        const NodoTitle = document.createElement('h5');
        NodoTitle.classList.add('card-title');
        NodoTitle.textContent = info.name;

        const NodoImagen = document.createElement('img');
        NodoImagen.classList.add('img-item');
        NodoImagen.setAttribute('src', info.image);

        const NodoPrecio = document.createElement('p');
        NodoPrecio.classList.add('card-text');
        NodoPrecio.textContent = `${divisa}${info.price}`;

        const NodoBoton = document.createElement('button');
        NodoBoton.classList.add('btn', 'btn-primary');
        NodoBoton.textContent = 'Add to cart';
        NodoBoton.setAttribute('marcador', info.id);
        NodoBoton.addEventListener('click', añadirProductoAlCarrito);

        NodoCardBody.appendChild(NodoImagen);
        NodoCardBody.appendChild(NodoTitle);
        NodoCardBody.appendChild(NodoPrecio);
        NodoCardBody.appendChild(NodoBoton);
        addNodo.appendChild(NodoCardBody);
        DOMitems.appendChild(addNodo);
    });
}


function añadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    cargarCarrito();
    guardarCarritoEnLocalStorage();
}


function cargarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const nItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const cartNodo = document.createElement('li');
        cartNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        cartNodo.textContent = `${numeroUnidadesItem} x ${nItem[0].name} - ${divisa} ${nItem[0].price}`;
        const cartBoton = document.createElement('button');
        cartBoton.classList.add('btn', 'btn-danger', 'mx-5');
        cartBoton.textContent = 'X';
        cartBoton.dataset.item = item;
        cartBoton.addEventListener('click', borrarItemCarrito);
        cartNodo.appendChild(cartBoton);
        DOMcarrito.appendChild(cartNodo);
    });
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    cargarCarrito();
    guardarCarritoEnLocalStorage();
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const mItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + mItem[0].price;
    }, 0).toFixed(2);
}


function vaciarCarrito() {

    carrito = [];
    
    cargarCarrito();
    localStorage.clear();
}



function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {

    if (miLocalStorage.getItem('carrito') !== null) {

        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}


DOMbotonVaciar.addEventListener('click', vaciarCarrito);

cargarCarritoDeLocalStorage();
cargarProductos();
cargarCarrito();

