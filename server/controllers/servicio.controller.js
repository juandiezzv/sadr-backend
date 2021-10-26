const Servicio = require('../models/servicio');
const { query, json } = require('express');
const servicioCtrl = {};

servicioCtrl.get_servicios  = async (req, res) =>{
    const servicios = await Servicio.find();
    res.json(servicios)
}

servicioCtrl.get_servicio = async (req,res) =>{
    console.log(req.params);
    const servicio = await Servicio.findById(req.params.id);
    res.json(servicio);
}


servicioCtrl.create_servicio = async (req, res) => {
    const servicio = new Servicio(req.body);
    await servicio.save();
    res.json({
        'status': 'Servicio registrado'
    });
}

servicioCtrl.get_tipo_servicios = async (req,res)=>{
    const tipos = await Servicio.distinct('tipo_servicio');
    res.json(tipos);
}

servicioCtrl.get_filtro_servicios = async (req,res) =>{

    //Consulta para devolver los servicios segun la categoria
    var query = {};
    var tipo_serv = "tipo_servicio"
    var value = req.params.tipo_servicio;
    query[tipo_serv] = value; 

    var serviciosFiltrados = await Servicio.find(query);
    res.json(serviciosFiltrados);
}


module.exports = servicioCtrl;
