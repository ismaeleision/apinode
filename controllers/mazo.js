const Mazo = require('../models/mazo');

async function nuevoMazo(req, res) {
  const nombre = req.body;

  try {
    if (!nombre) throw { msg: 'Nombre del mazo es obligatorio' };
    const mazo = new Mazo(nombre);
    //No importa que el nombre del mazo este repetido, si el que se creen excesivamenete
    mazo.save();

    res.status(200).send(mazo);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getMazos(req, res) {
  try {
    const user_email = req.params.user_email;
    const mazos = await Mazo.find({ user_email: user_email }).select({
      _id: 1,
      nombre: 1,
    });

    if (!mazos) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(mazos);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getMazo(req, res) {
  try {
    const user_email = req.body.user_email;
    const id = req.params.id;
    const mazos = await Mazo.find({ user_email: user_email, _id: id });

    if (!mazos) {
      res.status(400).send({ msg: 'Not found' });
    } else {
      res.status(200).send(mazos);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function añadirCartaMazo(req, res) {
  try {
    const id = req.body._id;
    const carta = req.body.carta; //coge la carta del body del form
    const mazo = await Mazo.findOne({ _id: id }); //busca un mazo que coincida con el id del mazo del form

    if (mazo) {
      mazo.updateOne({ _id: 1 }, { $push: { cartas: carta } }); //Si el mazo existe mete la carta en el array cartas
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function protected(req, res) {
  res.status(200).send({ msg: 'Contenido del endpoint protegido' });
}

//Para exportar las funciones get,post,delete,update
module.exports = {
  nuevoMazo,
  getMazos,
  getMazo,
  añadirCartaMazo,
  protected,
};
