const Grafico = require('../models/grafico');

//Añade un precio al array, si la grafica esta creada sino la crea y si se pasa del limite borra el dato mas antiguo e ingesta el nuevo
async function anadirPrecio(req, res) {
  try {
    const id = req.params.id;
    const precio = req.body;

    let grafico = await Grafico.findOne({ id: id });

    if (grafico) {
      //si el grafico es tiene 5 registros borra el mas antiguo y añade el nuevo
      if (grafico.precios.length > 4) {
        //deberia buscar el que coincida con el id, borrar el ultimo dato y meter el nuevo
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $pop: { precios: 1 } }
        );
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $push: { precios: precio } }
        );
        res.status(200).send(grafico);
      } else {
        //Si no hay 5 registros añade el nuevo sin mas
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $push: { precios: precio } }
        );
        res.status(200).send(grafico);
      }
    } else {
      //crea el mazo si no existe
      grafico = new Grafico();
      grafico.id = id;
      grafico.precio = precio;
      grafico.save();
      res.status(200).send(grafico);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getGrafico(req, res) {
  try {
    const id = req.params.id;
    const grafico = await Grafico.findOne({ id: id });
    if (grafico) {
      res.status(200).send(grafico);
    } else {
      res.status(400).send({ msg: 'error' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Para exportar las funciones get,post,delete,update
module.exports = {
  anadirPrecio,
  getGrafico,
};
