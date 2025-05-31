const express = require('express');
const controleVoluntario = require('../controllers/voluntariosController');

const router = express.Router();

router.post('\voluntarios', controleVoluntario.criarVoluntario);
router.get('\voluntarios', controleVoluntario.getAllVoluntarios)

module.exports = router;
