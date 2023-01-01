const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

const productos = [
    {
        id: 1,
        nombre: "Funda Card Deku Boku No Hero",
        precio: 1000,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/funda1.jpg',
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Mousepad Rasengan Naruto",
        precio: 1200,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/mousepad.jpg',
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Taza Shinji Evangelion",
        precio: 800,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/taza1.jpg',
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Mousepad Kaguya-Sama Love is War",
        precio: 1200,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/mousepad2.jpg',
        cantidad: 1,
    },
    {
        id: 5,
        nombre: "Taza Alas de la Libertad Shingeki No Kyojin",
        precio: 800,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/taza4.jpg',
        cantidad: 1,
    },
    {
        id: 6,
        nombre: "Funda Sukuna Jujutsu Kaisen",
        precio: 1000,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/funda2.jpg',
        cantidad: 1,
    },
    {
        id: 7,
        nombre: "Funda Tanjiro X Nezuko Kimetsu No Yaiba",
        precio: 1000,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/funda3.jpg',
        cantidad: 1,
    },
    {
        id: 8,
        nombre: "Mousepad Rem Re_Zero",
        precio: 1200,
        imagen: 'https://jeremiasbelucci.github.io/doblejjj/img/mousepad3.jpg',
        cantidad: 1,
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.innerHTML = `
    <div class="col-6 col-md-4 col-lg-10 d-flex justify-content-center">
    <div class="card" style="width: 40rem;">
      <img src="${product.imagen}" class="card-img-top" alt="Funda tipo card de Deku boku no hero">
      <div  class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <h6 class="card-text card-text-propio">${product.precio}</h6>
      </div>
    </div>
  </div>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar"

    content.append(comprar)

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProducot) => repeatProducot.id === product.id)

        if (repeat) {
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++
                }
            })
        }else {
        carrito.push({
            id : product.id,
            img: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad
        });
        saveLocal()
    }
    })
})

const pintarCarrito = () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalHeader = document.createElement("div")
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
            <h1 class="modal-header-title">Carrito.</h1>
            `;
        modalContainer.append(modalHeader)
        
        const modalbutton = document.createElement("h2");
        modalbutton.innerText = "x";
        modalbutton.className = "modal-header-button"
    
        modalbutton.addEventListener("click", () => {
            modalContainer.style.display = "none";
        })
    
        modalHeader.append(modalbutton)
    
    
        carrito.forEach((product) => {
            let carritoContent = document.createElement("div")
            carritoContent.className = "modal-content"
            carritoContent.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>${product.precio} $</p>
                <p>Cantidad: ${product.cantidad}</p>
                <p>Total: ${product.cantidad * product.precio}
            `
    
            modalContainer.append(carritoContent)

            let eliminar = document.createElement("span");

            eliminar.innerText = "❌"
            eliminar.className = "delete-product"
            carritoContent.append(eliminar)

            eliminar.addEventListener("click", eliminarProducto);
        })
    
        const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
        const totalBuying = document.createElement("div")
        totalBuying.className = "total-content"
        totalBuying.innerHTML = `Total a pagar: ${total} $`
        modalContainer.append(totalBuying)
};

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })

    saveLocal();
    pintarCarrito();
}
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
};


