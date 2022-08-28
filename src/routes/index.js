const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const peticionUser= require('./funciones/peticionUser')
const inventario = require('./funciones/inventario');
const selectRecolectar = require('./modelos/selectRecolectar');
const axios = require('axios')
require("dotenv").config()
const corsUrl = process.env.CORS



router.get('/', async (req, res) => {
	var user = req.user ||"";
	// try {
	// 	await axios.get(corsUrl)
	// .then(response => {
	//   console.log(response.data)
	// })
	// } catch (error) {
	// 	console.log("no funciona")
	// }
	
	if (user ==="") {
		res.render ('index'  ,  {
			user:  user, 
			saldo:user.saldo
		}); 
	}else{ 
		const result = await peticionUser(user);
		const {level,time}=result;
	
			res.render ('home'  ,  { 
				user:  user, 
				saldo: user.saldo,
				level:level,
				time:time
			})
	}
	
});

router.get('/home', async (req, res) => {
	var user = req.user ||"";
	const result = await peticionUser(user);
	const {level,time}=result;

		res.render ('home'  ,  { 
			user:  user, 
			saldo: user.saldo,
			level:level,
			time:time
		})
});

router.get('/market', async (req, res) => {
	var user = req.user ||"";
	
		res.render ('market'  ,  {
			user: user, 
			saldo: user.saldo,
			
		});
	
});

router.get('/inventario', async (req, res) => {
	var user = req.user ||"";
	const result = await inventario(user);
	if(user ===""){
		res.render('error', {
			user: user
		})
	} else {
		const { ticket, diamantes, xp, tesoro1, tesoro2, tesoro3, tesoro4, tesoro5, tesoro6 } = result;
		res.render('inventario', {
			user: user,
			saldo: user.saldo,
			level:user.level,
			ticket: ticket,
			cofres: diamantes,
			xp: xp,
			tesoro1: tesoro1,
			tesoro2: tesoro2,
			tesoro3: tesoro3,
			tesoro4: tesoro4,
			tesoro5: tesoro5,
			tesoro6: tesoro6
		});
	}
});

router.get('/recolectar', async (req, res) => {
	var user = req.user ||"";
	if(user ===""){
		res.render('error', {
			user: user
		})
	} else {
		const result = await selectRecolectar(user.steamid);
		const {detalle,img,saldo}= result;
		req.user.saldo = saldo;
		res.render ('recolectar'  ,  { 
			user:  user, 
			saldo: user.saldo,
			detalle: detalle,
			img:img
		})
	}
});

router.get('/commin', async (req, res) => {
	var user = req.user ||"";
		res.render ('commin'  ,  {
			user:  user,
			saldo:user.saldo
		});
	
	
});


module.exports = router;
