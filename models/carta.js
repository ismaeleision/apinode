const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartaSchema = Schema({
  id: {
    type: String,
    require: true,
  },
  precio: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('carta', CartaSchema, 'Cards');
