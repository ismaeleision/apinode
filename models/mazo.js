const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MazoSchema = Schema({
  nombre: {
    //nombre del mazo
    type: String,
    require: true,
  },
  usuario: {
    type: String,
    require: true, //para poder asignarlo a un usuario y pueda buscar los mazos que vaya creando
  },
  eliminado: {
    type: Boolean,
    require: false,
  },
  cartas: {
    type: [], //deberia crear un tipo array vacio para ir llenando de id de las cartas y quizá image_uris.normal
    require: false,
  },
});

module.exports = mongoose.model('Mazo', MazoSchema);
