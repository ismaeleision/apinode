const express = require('express');
const carta = require('../controllers/carta');

const api = express.Router();

api.get('/carta/page/:page', carta.getCarta);
api.get('/carta/id/:id', carta.getCartaId);
api.get('/carta/topvalue', carta.getTopValue); 
api.get('/carta/set/:set/:page', carta.getCartaSet);
api.get('/carta/set', carta.getSets);
api.get('/buscador/:nombre', carta.buscador);
api.get('/buscadorc/:nombre/:page', carta.buscadorCoincidencias);
api.get('/random', carta.aleatorio);

module.exports = api;
