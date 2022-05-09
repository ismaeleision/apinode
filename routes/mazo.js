const express = require('express');
const MazoController = require('../controllers/mazo');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/mazo/new', MazoController.nuevoMazo);
api.get('/user/:user_email', MazoController.getMazos);
api.get('/mazo/:id', MazoController.getMazo);
api.get('/protected', [md_auth.ensureAuth], MazoController.protected);

module.exports = api;
