const Grafico = require('../models/grafico');
const https = require('https');

//Añade un precio al array, si la grafica esta creada sino la crea y si se pasa del limite borra el dato mas antiguo e ingesta el nuevo
async function anadirPrecio(x, res) {
  const id = x;
  const options = {
    hostname: 'api.scryfall.com',
    port: 443,
    path: '/cards/' + id,
    method: 'GET',
  };
  let precio;
  const peticion = https.request(options, res => {
    precio = data;
  });
  let grafico = await Grafico.findOne({ _id: id });

  if (grafico) {
    //si el grafico es tiene 5 registros borra el mas antiguo y añade el nuevo
    if (grafico.precios.length > 4) {
      //deberia buscar el que coincida con el id, borrar el ultimo dato y meter el nuevo
      grafico = await Grafico.findOneAndUpdate(
        { id: id },
        { $pop: { precios: 1 } },
        { $push: { precios: precio } }
      );
    } else {
      grafico = await Grafico.findOneAndUpdate(
        { id: id },
        { $push: { precios: precio } }
      );
    }
  } else {
    //crea el mazo si no existe
    grafico = new Grafico();
    grafico.id = id;
    grafico.save();
    grafico = await Grafico.findOneAndUpdate(
      { id: id },
      { $push: { precios: precio } }
    );
  }
}

//Para exportar las funciones get,post,delete,update
module.exports = {
  anadirPrecio,
};
