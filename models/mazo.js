const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MazoSchema = Schema({
  nombre: {
    type: String,
    require: true,
  },
  user_email: {
    type: String,
    require: true,//para poder asignarlo a un usuario y pueda buscar los mazos que vaya creando
  },
  cartas: {
    type: [], //deberia crear un tipo array vacio para ir llenando de id de las cartas y quizá image_uris.normal
    require: false,
  },
});

module.exports = mongoose.model('Mazo', MazoSchema);
