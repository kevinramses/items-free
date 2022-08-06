const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// async function getUser(user){
// 	try { 
// 		var {steamid,personaname}=user
// 		var userDatos= [];
// 		var result = await pool.query("SELECT * FROM usuario WHERE id =" + steamid+ " LIMIT 1 ");
// 		if (result=="") {
// 			pool.query("INSERT INTO usuario (id, nombre, saldo, ip) VALUES ('"+steamid+"','"+personaname+"','0','172.25.25.23')" ,(err, result) => {
// 				if (err) {
// 					console.log("error");
// 				}
// 			})
// 			return saldo =2;
			 
// 		}else{
			
// 			return saldo = result[0].saldo;
// 		}        
// 		//    user._json.nombre=data.nombre;
// 		//    user._json.promo=data.promo;
//     } catch (error) {
//         return saldo =3;
//     }
// }


router.get('/', async (req, res) => {
	
	if (req.user) {

		res.render ('index'  ,  {
			user:  req.user
		});
	} else {
		res.render('index',{user: ""})
	}
});

router.get('/home', async (req, res) => {
	if (req.user) {
		req.user.saldo ="2";
		res.render ('home'  ,  {
			user:  req.user, 
			saldo: req.saldo
		});
	} else {
		res.render('home', {
			user:  "",
			saldo:""
	 })
	}
});

router.get('/market', async (req, res) => {
	if (req.user) {
		
		res.render ('market'  ,  {
			user: req.user, 
		});
	} else {
		res.render('market', {
			user:  "",
			saldo:""
	 })
	}
});


module.exports = router;
