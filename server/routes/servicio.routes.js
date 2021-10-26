const express = require('express');
const router = express.Router();

//Controladores
const servicioCtrl = require('../controllers/servicio.controller')

//Rutas
router.get('/',servicioCtrl.get_servicios);
router.get('/id/:id',servicioCtrl.get_servicio);
router.post('/',servicioCtrl.create_servicio);
router.get('/tipos/',servicioCtrl.get_tipo_servicios);
router.get('/filtro/:tipo_servicio',servicioCtrl.get_filtro_servicios);

module.exports = router;