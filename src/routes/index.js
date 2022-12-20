const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const betSelect = require('./modelos/betSelect')
const betJack = require('./modelos/betJack')
const userTop = require('./modelos/userTop')
const axios = require('axios');
const userJack = require('./modelos/userJack');
const lastBets = require('./modelos/lastBets');
const consultaId = require('./funciones/consultaId');

const apuestasId = require('./funciones/apuestasId');
require("dotenv").config()
const corsUrl = process.env.CORS



router.get('/', async (req, res) => {
	
		var user = req.user || "";
		res.render('index', {
			user: user
		})

});


router.get('/bets', async (req, res) => {
	
	var user = req.user || "";
	const bets = await betSelect()
	const jack = await betJack()
	const top = await userTop()
	const betsjack = await userJack()
	const last = await lastBets();

	res.render('bets', {
		user: user,
		bets:bets,
		jack:jack,
		top:top,
		last:last,
		us:betsjack
	})

});


router.get('/bets/:i',async (req, res) => {
	var user = req.user || "";
	var id = req.params.i
	const consulta = await pool.query("SELECT * FROM bets ,tipo WHERE bets.bets='"+id+"' AND tipo.bets_id='"+id+"'");
	const porc= await consultaId(consulta);
	const apuestas = await apuestasId(id)


		res.render('bet.ejs', { user: user  ,consulta:consulta,porc:porc,apuestas:apuestas})
	
})
 

module.exports = router;
