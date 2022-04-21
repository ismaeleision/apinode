const express = require('express');
const carta = require('../controllers/carta');

const api = express.Router();

api.get('/carta/page/:page', carta.getCarta);
api.get('/carta/id/:id', carta.getCartaId);
api.get('/carta/topvalue', carta.getTopValue); //No funciona
api.get('/carta/set/:set', carta.getCartaSet);
api.get('/carta/total', carta.getTotal);

module.exports = api;
