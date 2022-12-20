const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const betId = require('./funciones/betId');
const valoresId = require('./funciones/valoresId')


require("dotenv").config() 

router.post('/recolectar', async  (req, res) => {
   
  });

router.post('/cofres', async  (req, res) => {
   
});

router.get('/last/:id',async  (req, res) => {
	
	let id = req.params.id;
	const resul = await betId(id);

	 res.json(resul);	
  });

router.get('/valores/:id',async  (req, res) => {
	let id = req.params.id;
	const porc = await valoresId();
	res.json(porc);
})

module.exports = router;