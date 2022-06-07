const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GraficoSchema = Schema({
  id: {
    type: String,
    require: true,
  },
  precios: {
    type: Array,
    require: false,
  },
});

module.exports = mongoose.model('grafico', GraficoSchema, 'Grafico');
