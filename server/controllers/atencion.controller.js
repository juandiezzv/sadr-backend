const Atencion = require('../models/atencion');
const { query } = require('express');
const atencion = require('../models/atencion');
const cliente = require('../models/cliente');
const atencionCtrl = {};


atencionCtrl.get_Atenciones = async (req,res) =>{
    const atenciones = await Atencion.find();
    res.json(atenciones);
}

atencionCtrl.registrar_atencion_cliente = async (req, res) =>{
    //Primero buscamos al cliente por su dni 
    var query = {};
    var cliente_dni = "cliente_dni";
    var value = req.body.cliente_dni;
    query[cliente_dni] = value;

    //Verifica si este cliente ya presenta un historial de pedidos

    var atenciones = await Atencion.findOne(query);

    if(atenciones){
        res.json({
            "status":"Este cliente ya tiene un registro"
        });

        console.log(req.body)
        const atencion_servicio = {
                                    servicio_id: req.body.atencion_servicio.servicio_id,
                                    descripcion: req.body.atencion_servicio.descripcion, 
                                    fecha_atencion: req.body.atencion_servicio.fecha_atencion, 
                                    precio_servicio: req.body.atencion_servicio.precio_servicio,
                                    duracion_servicio: req.body.atencion_servicio.duracion_servicio,
                                    usuario_id:  req.body.atencion_servicio.usuario_id 

        }

        Atencion.findOneAndUpdate(
            {cliente_dni: atenciones.cliente_dni},
            { $push: { atencion_servicio : atencion_servicio}},
            function (error, success) {
                if(error){
                    console.log(error);
                } else {
                    console.log("Agregado al historial")
                }

            }
        );
    
    } else {    

        


        var query2 = {};
        var dni2 = "dni";
        var value2 = req.body.cliente_dni;
        query2[dni2] = value2; 
        const clienteBuscado = await cliente.findOne(query2)

        const atencion = new Atencion(
            {
                cliente_dni: req.body.cliente_dni,

                atencion_servicio: {
                            servicio_id: req.body.atencion_servicio.servicio_id,
                            descripcion: req.body.atencion_servicio.descripcion, 
                            fecha_atencion: req.body.atencion_servicio.fecha_atencion, 
                            precio_servicio: req.body.atencion_servicio.precio_servicio,
                            duracion_servicio: req.body.atencion_servicio.duracion_servicio,
                            usuario_id:  req.body.atencion_servicio.usuario_id 

                }
        }
        );

    

        if(clienteBuscado) {
            

            await atencion.save().then(
            
                res.json({
                    "status":"Atencion registrado",
                    "cliente": "Cliente encontrado"
                })
            ); 

        } else {
            

            await atencion.save().then(
                
            
                res.json({
                    "status":"Atencion registrado",
                    "cliente":"Cliente no encontrado"
                })
            ); 
        }

    }

}



atencionCtrl.registrar_reclamo_cliente = async (req, res) =>{
    //Primero buscamos al cliente por su dni 
    var query = {};
    var cliente_dni = "cliente_dni";
    var value = req.body.cliente_dni;
    query[cliente_dni] = value;

    console.log(req.body);

    //Verifica si este cliente ya presenta un historial de pedidos

    var atenciones = await Atencion.findOne(query);

    if(atenciones){
        res.json({
            "status":"Este cliente ya tiene un registro"
        });

        const atencion_reclamo = {
                                    servicio_id: req.body.atencion_reclamo.servicio_id,
                                    descripcion: req.body.atencion_reclamo.descripcion, 
                                    fecha_atencion: req.body.atencion_reclamo.fecha_atencion, 
                                    prioridad: req.body.atencion_reclamo.prioridad,
                                    estado: req.body.atencion_reclamo.estado,
                                    usuario_id:  req.body.atencion_reclamo.usuario_id 

        }

        console.log(atencion_reclamo);

        Atencion.findOneAndUpdate(
            {cliente_dni: atenciones.cliente_dni},
            { $push: { atencion_reclamo : atencion_reclamo}},
            function (error, success) {
                if(error){
                    console.log(error);
                } else {
                    console.log("Agregado al historial")
                }

            }
        );
    
    } else {    

        

        //Comprobamos si el cliente existe para mandarselo al front 

        var query2 = {};
        var dni2 = "dni";
        var value2 = req.body.cliente_dni;
        query2[dni2] = value2; 
        const clienteBuscado = await cliente.findOne(query2)

        const atencion = new Atencion(
            {
                cliente_dni: req.body.cliente_dni,

                atencion_reclamo: {
                            servicio_id: req.body.atencion_reclamo.servicio_id,
                            descripcion: req.body.atencion_reclamo.descripcion, 
                            fecha_atencion: req.body.atencion_reclamo.fecha_atencion, 
                            prioridad: req.body.atencion_reclamo.prioridad,
                            estado: req.body.atencion_reclamo.estado,
                            usuario_id:  req.body.atencion_reclamo.usuario_id 

                }
        }
        );

    

        if(clienteBuscado) {
            

            await atencion.save().then(
            
                res.json({
                    "status":"Atencion registrado",
                    "cliente": "Cliente encontrado"
                })
            ); 

        } else {
            

            await atencion.save().then(
                
            
                res.json({
                    "status":"Atencion registrado",
                    "cliente":"Cliente no encontrado"
                })
            ); 
        }

    }

}
module.exports = atencionCtrl;