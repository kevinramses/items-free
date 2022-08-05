const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	if (req.user) {
		var user = req.user;
		res.render ('index'  ,  {
			user:  user, 
		});
	} else {
		res.render('index', {
			user:  "",
			saldo:""
	 })
	}
});

router.get('/home', async (req, res) => {
	if (req.user) {
		var user = req.user;
		res.render ('home'  ,  {
			user:  user, 
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
		var user = req.user;
		res.render ('market'  ,  {
			user:  user, 
		});
	} else {
		res.render('market', {
			user:  "",
			saldo:""
	 })
	}
});


module.exports = router;
