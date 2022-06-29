const d = document;

const $lblOnline = d.getElementById('lblOnline');
const $lblOffline = d.getElementById('lblOffline');
const $btnEnviar = d.getElementById('btnEnviar');
const $txtMensaje = d.getElementById('txtMensaje');


// ============================================================
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');

  $lblOffline.style.display = 'none';
  $lblOnline.style.display = '';
})

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');

  $lblOnline.style.display = 'none';
  $lblOffline.style.display = '';
})

socket.on('msj-servidor', (payload) => {
  console.log('Soy cliente - Mensaje recibido', payload);
})

// ============================================================
d.addEventListener('click', (e) => {

  // content del input
  const mensaje = $txtMensaje.value;
  // obj con el mensaje y data adicional
  const payload = {
    mensaje,
    id: '123455',
    fecha: new Date().getTime()
  }

  if (e.target === $btnEnviar) {

    // envio de mensaje al servidor
    // callback - respuesta personalizada si el server recibe el msj
    socket.emit('msj-cliente', payload, (data) => {
      console.log(' Respuesta del server ', data);
    });

  }
})