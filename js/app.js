/* Creamos el carrito y el inventario disponible */
const carrito = [];
let inventario = [];
let contadorCarro = 0;

/* Agregamos objetos al inventario */
inventario.push(new Item("1", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("2", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("3", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("4", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("5", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("6", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("7", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("8", "Monitor", "Samsung", "Modelo1", 57000, 1));

/* Creamos las cards con los datos del inventario */
const productoCatalogoHTML = (item) => {
  return `
    <div class="col col-xl-3 col-md-6 col-sm-12 py-5">
            <div class="card color-card" style="width: 18rem">
              <img src="/assets/images/${item.tipo}.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${item.tipo}</h5>
                <p class="card-text">Marca: ${item.marca}</p>
                <p class="card-text">Modelo: ${item.modelo}</p>
                <p class="card-text">Precio: ${item.precio}</p>
                <button id="btn-catalogo-${item.id}" class="btn btn-success">Agregar</button>
              </div>
            </div>
          </div>`;
};

/* Creamos las cards con los productos agregados al carrito */
const productoCarritoHTML = (item) => {
  return `
    <div class="col col-xl-3 col-md-6 col-sm-12 py-5">
            <div class="card color-card" style="width: 18rem">
              <img src="/assets/images/${item.tipo}.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${item.tipo}</h5>
                <p class="card-text">Marca: ${item.marca}</p>
                <p class="card-text">Modelo: ${item.modelo}</p>
                <p class="card-text">Precio: ${item.precio}</p>
                <p class="card-text">Cantidad: ${item.cantidad}</p>
                <button id="btn-carrito-${item.idCompra}" class="btn btn-danger">Quitar</button>
                <button id="btn-sumcant-${item.idCompra}" class="btn btn-danger">+</button>
                <button id="btn-rescant-${item.idCompra}" class="btn btn-danger">-</button>
              </div>
            </div>
          </div>`;
};

/* Funcion que nos permite mostrar todos los producots */
const mostrarCatalogo = () => {
  let tarjetaCatalogo = document.getElementById("catalogo");
  let catalogoHTML = "";

  for (let item of inventario) {
    catalogoHTML += productoCatalogoHTML(item);
  }

  tarjetaCatalogo.innerHTML = catalogoHTML;
  botonesCatalogo();
};

/* Funcion para mostrar elementos en el carro */
const mostrarCarrito = () => {
  let cardCarro = document.getElementById("carrito");
  let precioCarro = document.getElementById("precioTotal");
  let carroHTML = "";
  let precioFinal = 0;
  for (let item of carrito) {
    carroHTML += productoCarritoHTML(item);
    precioFinal = precioFinal + item.precio * item.cantidad;
  }

  precioCarro.innerHTML = precioFinal;
  cardCarro.innerHTML = carroHTML;
  botonesCarrito();
  botonSumarCant();
  botonRestarCant();
};

/* Funcion para agregar listener a los botones de agregar al carro */
const botonesCatalogo = () => {
  for (let item of inventario) {
    let idBoton = `btn-catalogo-${item.id}`;
    let cardBoton = document.getElementById(idBoton);

    cardBoton.addEventListener("click", () => {
      let itemCarrito = {
        tipo: item.tipo,
        marca: item.marca,
        modelo: item.modelo,
        precio: item.precio,
        idCompra: contadorCarro,
        cantidad: item.cantidad,
      };
      contadorCarro++;
      carrito.push(itemCarrito);
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

/* Funcion para agregar listener a los botones de quitar del carro */
const botonesCarrito = () => {
  for (let item of carrito) {
    let idBtnCarro = `btn-carrito-${item.idCompra}`;
    let cardBotonCarro = document.getElementById(idBtnCarro);

    cardBotonCarro.addEventListener("click", () => {
      let indice = carrito.findIndex(
        (param) => param.idCompra == item.idCompra
      );
      carrito.splice(indice, 1);
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

const botonSumarCant = () => {
  for (let item of carrito) {
    let idBtnSum = `btn-sumcant-${item.idCompra}`;
    let cardSumar = document.getElementById(idBtnSum);

    cardSumar.addEventListener("click", () => {
      let indice = carrito.findIndex((p) => p.idCompra == item.idCompra);
      carrito[indice].cantidad++;
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

const botonRestarCant = () => {
  for (let item of carrito) {
    let idBtnRes = `btn-rescant-${item.idCompra}`;
    let cardRestar = document.getElementById(idBtnRes);

    cardRestar.addEventListener("click", () => {
      let indice = carrito.findIndex((p) => p.idCompra == item.idCompra);
      if (carrito[indice].cantidad > 0) {
        carrito[indice].cantidad--;
      }
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

/* Ejecucion del programa */
mostrarCatalogo();

console.log(productoCatalogoHTML(inventario[0]));
