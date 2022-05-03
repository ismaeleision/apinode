const Carta = require('../models/carta');

async function getCarta(req, res) {
  try {
    //Paginar limite 12 y al pasar de pagina pasa hace skip a los siguiente 60
    let perPage = 12,
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
    const carta = await Carta.find().limit(25).sort(['prices.eur', -1]);

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
    let imite = limite / 12;
    if (!imite) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send({ imite });
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
async function getCantidadCartaSet(req, res) {
  try {
    const setCarta = req.params.set;
    const total = await Carta.find({ set: setCarta }).countDocuments();
    let limite = total / 12;

    if (!limite) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send({ limite });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//obtiene el codigo del set y su nombre
async function getSets(req, res) {
  try {
    const set = await Carta.aggregate([
      { $group: { _id: { set: '$set', set_name: '$set_name' } } },
      { $sort: { set: -1 } },
    ]);

    if (!set) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(set);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Obtiene 5 resultados que coinciden con el parametro
async function buscador(req, res) {
  try {
    const nombre = req.params.nombre;

    //new regexp sirve para que ignore capital de las letras
    const cartas = await Carta.find({
      name: { $regex: new RegExp(nombre, 'i') },
      oracle_text: { $regex: new RegExp(nombre, 'i') },
      type_line: { $regex: new RegExp(nombre, 'i') },
    })
      .limit(5)
      //ordena alfabeticamente
      .sort({ name: 1 })
      //filtra la informacion que se manda
      .select({ _id: 1, name: 1, set_name: 1 });

    if (!cartas) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(cartas);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getCarta,
  getTopValue,
  getCartaId,
  getCartaSet,
  getTotal,
  getCantidadCartaSet,
  getSets,
  buscador,
};
