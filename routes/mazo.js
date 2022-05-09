const express = require('express');
const MazoController = require('../controllers/mazo');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/mazo/new', MazoController.nuevoMazo);
api.get('/user', MazoController.getMazos);
api.get('/protected', [md_auth.ensureAuth], MazoController.protected);

module.exports = api;
