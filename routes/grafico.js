const express = require('express');
const grafico = require('../controllers/grafico');

const api = express.Router();

api.post('/grafico/:id', grafico.anadirPrecio);

module.exports = api;
