const Carta = require('../models/carta');

//Devuelve las primeras 50 criptos de la bd
async function getCarta(req, res) {
  try {
    //Paginar limite 20 y al pasar de pagina pasa hace skip a los siguiente 60
    let perPage = 20,
      page = req.params.page;
    const carta = await Carta.find()
      .limit(perPage)
      .skip(perPage * page);

    if (!carta) {
      res.status(400).send({ msg: 'Error al obtener las cartas' });
    } else {
      res.status(200).send(carta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//obtiene la carta con mas valor
async function getTopValue(req, res) {
  try {
    const carta = await Carta.findOne().sort(['prices.eur', -1]);

    if (!carta) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(carta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Devuelve la carta por id
//Fumciona solo con el _id
async function getCartaId(req, res) {
  try {
    const idCarta = req.params.id;
    const carta = await Carta.findById(idCarta);

    if (!carta) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(carta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Cuenta el num total de resultados en la coleccion cartas
async function getTotal(req, res) {
  try {
    const limite = await Carta.find().countDocuments();
    let imite = limite / 20;
    const paginas = [];
    for (let i = 1; i < imite; i++) {
      paginas.push({ i });
    }
    if (!paginas) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(paginas);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Filtra los resultados que coincidan con el set
async function getCartaSet(req, res) {
  try {
    const setCarta = req.params.set;
    const carta = await Carta.find({ set: setCarta });

    if (!carta) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(carta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

/*
async function putCripto(req, res) {
  const idCripto = req.params.id;
  const params = req.body;

  try {
    const cripto = await Cripto.findByIdAndUpdate(idCripto, params);

    if (!cripto) {
      res.status(400).send({ msg: 'No se ha podido actualizar la cripto' });
    } else {
      res.status(200).send({ msg: 'Actualizacion completada' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
*/

/*
//Actualiza la subida del precio de la cripto
async function upCripto(req, res) {
  const idCripto = req.params.id;

  try {
    const cripto = await Cripto.findByIdAndUpdate(idCripto, {
      $inc: { precio: 0.1 },
    }).exec();

    if (!cripto) {
      res.status(400).send({ msg: 'No se ha podido actualizar la cripto' });
    } else {
      res.status(200).send({ msg: 'Actualizacion completada' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
*/

/*
//Actualiza la bajada del precio de la cripto
async function downCripto(req, res) {
  const idCripto = req.params.id;
  try {
    const cripto = await Cripto.findByIdAndUpdate(idCripto, {
      $inc: { precio: -0.1 },
    }).exec();

    if (!cripto) {
      res.status(400).send({ msg: 'No se ha podido actualizar la cripto' });
    } else {
      res.status(200).send({ msg: 'Actualizacion completada' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
*/

/*
//Añade una nueva cripto a la BD
async function addCripto(req, res) {
  const cripto = new Cripto();
  const params = req.body;

  cripto.id = params.id;
  cripto.nombre = params.nombre;
  cripto.simbolo = params.simbolo;
  cripto.descrip = params.descrip;
  cripto.precio = params.precio;
  cripto.dia = params.dia;
  cripto.capitalizacion = params.capitalizacion;

  try {
    const criptoStore = await cripto.save();

    if (!criptoStore) {
      res.status(400).send({ msg: 'No se ha guardado la cripto' });
    } else {
      res.status(200).send({ cripto: criptoStore });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
*/

/*
//Elimina una cripto de la bd por id
async function deleteCripto(req, res) {
  const idCripto = req.params.id;

  try {
    const cripto = await Cripto.findByIdAndDelete(idCripto);

    if (!cripto) {
      res.status(404).send({ msg: 'No se ha podido eliminar la tarea' });
    } else {
      res.status(200).send({ msg: 'cripto eliminada' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
*/

module.exports = {
  getCarta,
  getTopValue,
  getCartaId,
  getCartaSet,
  getTotal,
  /*
  putCripto,
  upCripto,
  downCripto,
  addCripto,
   deleteCripto,
  */
};
