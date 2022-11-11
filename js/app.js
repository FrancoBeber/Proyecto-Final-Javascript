/* Creamos el carrito y el inventario disponible */
const contenedor = document.querySelector("#lista-carrito tbody");
let carrito = [];
let inventario = [];
let producto = [];
let contadorCarro = 0;

/* Agregamos objetos al inventario */
/*
inventario.push(new Item("1", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("2", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("3", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("4", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("5", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("6", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("7", "Monitor", "Samsung", "Modelo1", 57000, 1));
inventario.push(new Item("8", "Monitor", "Samsung", "Modelo1", 57000, 1));
*/

fetch("api/catalogo.json")
  .then((res) => res.json())
  .then((data) => {
    inventario = data[0].inventario;
    for (let item of inventario) {
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
      mostrarCatalogo();
    }
  })
  .catch((err) => console.log(err));

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

/* Funcion para mostrar tabla del carrito*/
const carroSuperiorHTML = (item) => {
  return `
  <tbody id="cuerpo-tabla"></tbody>
    <tr>
      <th></th>
      <th><img src="/assets/images/${item.tipo}.png" class="card-img-top" alt="..." /></th>
      <th>${item.tipo}</th>
      <th>${item.marca}</th>
      <th>${item.modelo}</th>
      <th>${item.precio}</th>
      <th>${item.cantidad}</th>
      <th><button id="btn-carritoSup-${item.idCompra}" class="btn btn-danger">X</button></th>
      <th></th>
    </tr>`;
};

/* Funcion para mostrar elementos en el carro */
const mostrarCarrito = () => {
  let carroSup = document.getElementById("cuerpo-tabla");
  let cardCarro = document.getElementById("carrito");
  let precioCarro = document.getElementById("precioTotal");
  let carroHTML = "";
  let carroSupHTML = "";
  let precioFinal = 0;
  for (let item of carrito) {
    carroHTML += productoCarritoHTML(item);
    carroSupHTML += carroSuperiorHTML(item);
    precioFinal = precioFinal + item.precio * item.cantidad;
  }
  carroSup.innerHTML = carroSupHTML;
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
    let idBtnCarritoSup = `btn-carritoSup-${item.idCompra}`;
    let idBtnCarro = `btn-carrito-${item.idCompra}`;
    let cardBotonCarro = document.getElementById(idBtnCarro);
    let botonX = document.getElementById(idBtnCarritoSup);

    cardBotonCarro.addEventListener("click", () => {
      let indice = carrito.findIndex(
        (param) => param.idCompra == item.idCompra
      );
      carrito.splice(indice, 1);
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    botonX.addEventListener("click", () => {
      let ind = carrito.findIndex((p) => p.idCompra == item.idCompra);
      carrito.splice(ind, 1);
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

function borrarItem(e) {
  var element = e.target;
  element.parentNode.removeChild(element);
  carritoCompras = carritoCompras.filter(
    (e) => e.id != element.getAttribute("data-id")
  );
  mostrarCarrito();
}

/* Funcion que carga datos del local storage si los hay*/
function cargarLocalCarrito() {
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
  });
}

/* Ejecucion del programa */
cargarLocalCarrito();
//mostrarCatalogo();
