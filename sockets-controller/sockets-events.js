

const socketsEvents = (socket) => {

  // ============================================================
  // detecta la desconexion del cliente
  // ============================================================

  console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  })


  // ============================================================
  // recibe el mensaje del cliente
  // ============================================================
  socket.on('msj-cliente', (payload, callback) => {
    // console.log('Mensaje recibido ', payload)

    // emite el mensaje al cliente(todos los clientes reciben este msj)
    socket.broadcast.emit('msj-servidor', payload)


    // obj de respuesta al cliente de msj recibido(respuesa a cliente que envio msj)
    const respToClient = {
      id: payload.id,
      mensaje: `tu msj fue recibido en el servidor`,
      fecha: new Date().getTime()
    }
    callback(respToClient);

  })
}

module.exports = {
  socketsEvents
}