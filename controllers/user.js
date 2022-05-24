const jwt = require('../services/jwt');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Mazo = require('../models/mazo');

//Funcion que lleva el registro del usuario
//Funciona
async function register(req, res) {
  const user = new User(req.body);
  const { email, password } = req.body;

  try {
    if (!email) throw { msg: 'Email es obligatorio' };
    if (!password) throw { msg: 'Contraseña es obligatoria' };

    //Revisamos si el email esta en uso
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail) throw { msg: 'El email esta en uso' };

    const salt = bcryptjs.genSaltSync(10);
    user.password = await bcryptjs.hash(password, salt);
    user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Funcion que lleva el logueo del usuario y le entrega un token temporal
//Funciona
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const Mazos = await Mazo.find({ usuario: user.email, eliminado: false });
    if (!user) throw { msg: 'Error en el email o contraseña' };
    if (!Mazos) throw { msg: 'Falla busqueda mazo' };

    const passwordSuccess = await bcryptjs.compare(password, user.password);
    if (!passwordSuccess) throw { msg: 'Error en el email o contraseña' };

    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .send({
        token: jwt.createToken(user, '12h'),
        email: user.email,
        mazos: Mazos,
      });
  } catch (error) {
    res.status(500).send(error);
  }
}

function protected(req, res) {
  res.status(200).send({ msg: 'Contenido del endpoint protegido' });
}

module.exports = {
  register,
  login,
  protected,
};
