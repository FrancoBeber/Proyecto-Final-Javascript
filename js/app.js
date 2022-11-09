/* Creamos el carrito y el inventario disponible */
const carrito = [];
let inventario = [];
let contadorCarro = 0;

/* Agregamos objetos al inventario */
inventario.push(new Item("1", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("2", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("3", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("4", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("5", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("6", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("7", "Monitor", "Samsung", "Modelo1", 57000));
inventario.push(new Item("8", "Monitor", "Samsung", "Modelo1", 57000));

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
                <button id="btn-carrito-${item.idCompra}" class="btn btn-danger">Quitar</button>
              </div>
            </div>
          </div>`;
};

const mostrarCatalogo = () => {
  let tarjetaCatalogo = document.getElementById("catalogo");
  let catalogoHTML = "";

  for (let item of inventario) {
    catalogoHTML += productoCatalogoHTML(item);
  }

  tarjetaCatalogo.innerHTML = catalogoHTML;
  botonesCatalogo();
};
const mostrarCarrito = () => {
  let cardCarro = document.getElementById("carrito");
  let precioCarro = document.getElementById("precioTotal");
  let carroHTML = "";
  let precioFinal = 0;
  for (let item of carrito) {
    carroHTML += productoCarritoHTML(item);
    precioFinal += item.precio;
  }

  precioCarro.innerHTML = precioFinal;
  cardCarro.innerHTML = carroHTML;
  botonesCarrito();
};

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
      };
      contadorCarro++;
      carrito.push(itemCarrito);
      mostrarCarrito();
    });
  }
};
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
    });
  }
};

mostrarCatalogo();

console.log(productoCatalogoHTML(inventario[0]));
