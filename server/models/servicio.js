const mongoose = require('mongoose');
const { Schema } = mongoose;


var ServicioSchema = new Schema({
    nombre: {type: String},
    tipo_servicio: {type: String},
    detalles: {type: String},
    precio_referencial: {type: Number}
});


module.exports = mongoose.model('Servicio', ServicioSchema);