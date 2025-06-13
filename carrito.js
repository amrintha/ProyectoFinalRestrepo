document.addEventListener('DOMContentLoaded', () => {
  const carritoContainer = document.getElementById('carrito-container');
  const totalCompra = document.getElementById('total');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function showCarrito() {
    carritoContainer.innerHTML = '';

    carrito.forEach(item => {
      const div = document.createElement('div');
      div.className = 'carrito-item';

      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <h3>${item.nombre}</h3>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <button onclick="eliminar(${item.id})">Eliminar 1 un</button>
      `;

      carritoContainer.appendChild(div);
    });

    actualizarTotal();
  }

  function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalCompra.innerText = `Total: $${total}`;
  }

  window.eliminar = function (id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
      carrito[index].cantidad--;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      showCarrito();
    }
  };

  const vaciar-carrito = document.getElementById("vaciar-carrito");
  vaciar-carrito.addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    showCarrito();
    totalCompra.innerText = 'Total: $0';
  });

  showCarrito();
});