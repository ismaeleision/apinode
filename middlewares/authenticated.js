const moment = require('moment');
const jwt = require('../services/jwt');

const SECRET_KEY = 'sfasdlkjLKJL46548S4DF65S4DF8A65sdf';

function ensureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: 'la peticion no tiene la cabecera de Autentificacion' });
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');
  const payload = jwt.decodeToken(token, SECRET_KEY);

  try {
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({ msg: 'Token ha expirado' });
    }
  } catch (error) {
    return res.status(404).send({ msg: 'Token invalid' });
  }

  res.user = payload;
  next();
}

module.exports = {
  ensureAuth,
};
