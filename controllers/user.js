const jwt = require('../services/jwt');
const bcryptjs = require('bcryptjs');
const user = require('../models/user');

//Funcion que lleva el registro del usuario
async function register(req, res) {
  const user = new User(req.body);
  const { email, password } = req.body;

  try {
    if (!email) throw { msg: 'Email es obligatorio' };
    if (!password) throw { msg: 'Contraseña es obligatoria' };

    //Revisamos si el email esta en uso
    const foundEmail = await UserFindOne({ email: email });
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
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw { msg: 'Error en el email o contraseña' };

    const passwordSuccess = await bcryptjs.compare(password, user.password);
    if (!passwordSuccess) throw { msg: 'Error en el email o contraseña' };

    res.status(200).send({ token: jwt.createToken(user, '12h') });
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
