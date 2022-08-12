const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const peticionUser= require('./funciones/peticionUser')


router.get('/', async (req, res) => {
	var user = req.user ||"";
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
			saldo: user.saldo
		});
	
});
router.get('/inventario', async (req, res) => {
	var user = req.user ||"";
		res.render ('inventario'  ,  {
			user: user, 
			saldo: user.saldo
		});
	
});



module.exports = router;
