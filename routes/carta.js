const express = require('express');
const carta = require('../controllers/carta');

const api = express.Router();

api.get('/carta/page/:page', carta.getCarta);
api.get('/carta/id/:id', carta.getCartaId);
api.get('/carta/topvalue', carta.getTopValue); //No funciona
api.get('/carta/set/:set', carta.getCartaSet);

/*
api.put('/criptoc/id/:id', cripto.putCripto);
api.put('/criptoc/up/id/:id', cripto.upCripto);
api.put('/criptoc/down/id/:id', cripto.downCripto);
api.post('/criptoc', cripto.addCripto);

api.delete('/criptoc/id/:id', cripto.deleteCripto);
*/
module.exports = api;
