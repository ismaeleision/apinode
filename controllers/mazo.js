const Mazo = require('../models/mazo');

async function nuevoMazo(req, res) {
  const nombre = req.body.nombre;
  const usuario = req.body.usuario;

  try {
    if (!nombre || !usuario)
      throw { msg: 'Hace falta el id del usuario o el nombre del mazo' };
    const mazo = new Mazo();
    //No importa que el nombre del mazo este repetido, si el que se creen excesivamenete
    mazo.nombre = nombre;
    mazo.usuario = usuario;
    mazo.eliminado = false;
    mazo.save();

    res.status(200).send(mazo);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getMazo(req, res) {
  try {
    const user_email = req.body.user_email;
    const id = req.params.id;
    const mazos = await Mazo.find({ _id: id, usuario: user_email });

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

//Basicamente va a cambiar un atributo boleano a true para que la busqueda de mazos no salgan
async function deleteMazo(req, res) {
  try {
    const id = req.params.id;
    const mazo = await Mazo.findOneAndUpdate({ _id: id }, { eliminado: true }); //busca un mazo que coincida con el id del mazo del form

    if (mazo) {
      res.status(200).send(mazo);
    } else {
      res.status(400).send({ msg: 'Not found' });
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
  getMazo,
  añadirCartaMazo,
  deleteMazo,
  protected,
};
