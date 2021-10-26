const express = require('express');
const router = express.Router();

//Controladores 
const atencionCtrl = require('../controllers/atencion.controller')

//Rutas
router.get('/',atencionCtrl.get_Atenciones);
router.post('/servicio',atencionCtrl.registrar_atencion_cliente);
router.post('/reclamo',atencionCtrl.registrar_reclamo_cliente);

module.exports = router; 