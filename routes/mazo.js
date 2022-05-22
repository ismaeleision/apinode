const express = require('express');
const MazoController = require('../controllers/mazo');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/mazo/new', MazoController.nuevoMazo);
api.get('/mazo/:usuario', MazoController.getMazos);
api.get('/mazo/:usuario/:id', MazoController.getMazo);
api.get('/protected', [md_auth.ensureAuth], MazoController.protected);
api.post('/mazo/delete/:id', MazoController.deleteMazo);

module.exports = api;
