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

module.exports = router;
