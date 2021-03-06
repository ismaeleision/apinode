const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const carta_routes = require('./routes/carta');
const user_routes = require('./routes/user');
const mazo_routes = require('./routes/mazo');
const grafico_routes = require('./routes/grafico');

//para que angular le deje paso
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Rutas base
app.use('', carta_routes);
app.use('', user_routes);
app.use('', mazo_routes);
app.use('', grafico_routes);

module.exports = app;
