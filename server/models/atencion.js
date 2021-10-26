const mongoose = require('mongoose');
const {Schema} = mongoose;


var Atencion_Servicio = new Schema({
    servicio_id: {type: String},
    descripcion: {type: String},
    fecha_atencion: {type: String},
    precio_servicio: {type: Number},
    duracion_servicio: {type: String},
    usuario_id: {type: String}
})


var Atencion_Reclamo = new Schema({
    servicio_id: {type: String},
    descripcion: {type: String},
    fecha_atencion: {type: String},
    prioridad: {type: String},
    estado: {type: String},
    usuario_id: {type: String}
})

const AtencionSchema = new Schema({
    cliente_dni: {type: String},
    atencion_servicio: [Atencion_Servicio],
    atencion_reclamo: [Atencion_Reclamo] 
})


module.exports = mongoose.model('Atencion', AtencionSchema);