const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/productos', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'marco error :(')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('Estas conectado :)'); // si esta todo ok, imprime esto
});