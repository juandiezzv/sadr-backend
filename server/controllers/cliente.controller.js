const Cliente = require('../models/cliente');
const { query } = require('express');
const clienteCtrl = {};

clienteCtrl.get_clientes = async (req,res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
}

clienteCtrl.create_cliente = async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.json({
        'status': 'Cliente registrado'
    });
}

clienteCtrl.get_cliente = async (req, res)=> {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
}

clienteCtrl.get_clienteByDNI = async (req, res) => {
    var query = {};
    var dni = "dni";
    var value = req.params.dni;
    query[dni] = value; 
    const cliente = await Cliente.findOne(query)
    res.json(cliente);
}

clienteCtrl.edit_cliente = async (req, res )=> {
    const { id } = req.params;
    const cliente = {
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        tipo_cliente: req.body.tipo_cliente
    }
    await Cliente.findByIdAndUpdate(id, {$set: cliente}, {new: true});
    res.json({status: 'Cliente Actualizado'});
}

clienteCtrl.delete_cliente = async (req,res)=>{
    const { id } = req.params;
    await Cliente.findByIdAndRemove(id);
    res.json({status: 'Cliente Eliminado'})
}

    
module.exports = clienteCtrl;