const Grafico = require('../models/grafico');

//Crea una nueva Grafica con el id de la carta correspondiente
async function nuevaGrafica(carta) {
  const _id = carta;

  try {
    if (!id) throw { msg: 'Es necesario id' };
    const grafico = new Grafico();
    //No importa que el nombre del mazo este repetido, si el que se creen excesivamenete
    grafico.id = _id;
    grafico.save();

    res.status(200).send(grafico);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Añade un precio al array, si la grafica esta creada sino la crea y si se pasa del limite borra el dato mas antiguo e ingesta el nuevo
async function añadirPrecio(carta, dinero) {
  try {
    const id = carta;
    const precio = dinero; //coge la carta del body del form
    let grafico = await Grafico.findOne({ _id: id });

    if (grafico) {
      //si el grafico es tiene 5 registros borra el mas antiguo y añade el nuevo
      if (grafico.precios.length > 4) {
        //deberia buscar el que coincida con el id, borrar el ultimo dato y meter el nuevo
        grafico = await Grafico.findOneAndUpdate(
          { _id: id },
          { $pop: { precios: 1 } },
          { $push: { precios: precio } }
        );
      }
      res.status(200).send(grafico);
    } else {
      nuevaGrafica(id);
      grafico = await Grafico.findOneAndUpdate(
        { _id: id },
        { $push: { precios: precio } }
      );
      res.status(200).send({ msg: 'Grafica creada y Actualizada ' + grafico });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Para exportar las funciones get,post,delete,update
module.exports = {
  nuevaGrafica,
  añadirPrecio,
};
