const express = require('express');
const router = express.Router();

// Controllers
const controleVoluntario = require('../controllers/voluntariosController');
const controleCertificado = require('../controllers/certificadoController');

//Routers voluntqarios
router.post('/voluntarios', controleVoluntario.criarVoluntario);
router.get('/voluntarios', controleVoluntario.getAllVoluntarios)
router.get('/voluntarios/:idVoluntario', controleVoluntario.getVoluntario)
router.delete('/voluntarios/:idVoluntario', controleVoluntario.deletaVoluntario)

//Routers certificados
router.post('/voluntarios/:idVoluntario/certificados', controleCertificado.criarCertificado);
router.get('/voluntarios/:idVoluntario/certificados', controleCertificado.listarCertificados);
router.get('/certificados', controleCertificado.listarTodosCertificados);
router.get('/certificados/:idVoluntario/:idCertificado', controleCertificado.getCertificado);
router.delete('/certificados/:idVoluntario/:idCertificado', controleCertificado.deletarCertificado);

module.exports = router;