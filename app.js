const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const carta_routes = require('./routes/carta');

// Rutas base
app.use('/api', carta_routes);

module.exports = app;
