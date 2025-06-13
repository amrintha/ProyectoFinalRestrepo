let licores = [];
let carrito = [];

try {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!Array.isArray(carrito)) carrito = [];
} catch (e) {
  carrito = [];
}

// Fetch
async function cargarLicores() {
    try {
        const response = await fetch("licores.json");
        if (!response.ok) throw new Error("Error al cargar JSON");
        licores = await response.json();
        showLicores();
    } catch (error) {
        Swal.fire("Error: "+ error.message);
    }
}

// Mostrar
function showLicores() {
    const contenedor = document.getElementById("licores");
    contenedor.innerHTML = "";
    licores.forEach(licor => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${licor.imagen}" alt="${licor.nombre}"/>
        <h3>${licor.nombre}</h3>
        <p>Precio: $${licor.precio}</p>
        <button onclick="agregarAlCarrito(${licor.id})">Comprar</button>
    `;
        contenedor.appendChild(card);
    });
}

// Agregar
function agregarAlCarrito(id) {

  const licor = licores.find(p => p.id === id);
  if (!licor) {
    Swal.fire("Producto no encontrado");
    return;
  }

  let itemEnCarrito = null;
  if (Array.isArray(carrito)) {
    itemEnCarrito = carrito.find(p => p.id === id);
  } else {
    carrito = [];
  }

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({
      id: licor.id,
      nombre: licor.nombre,
      precio: licor.precio,
      imagen: licor.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  Toastify({
    text: `Producto agregado al carrito`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background:"#e64716",
    },
  }).showToast();
}

cargarLicores();