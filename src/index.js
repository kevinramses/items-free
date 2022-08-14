const express = require('express');
const app = express();

// pahts
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
//sesion
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cookieParser = require('cookie-parser');
//sockets
const server = require('http').Server(app);
// database
const pool = require('./config/database');
require("dotenv").config()
//var
const localBet = process.env.LOCAL;
const axios = require('axios');
const { database } = require('./config/keys');

//
passport.serializeUser(async(user, done) => {
	
    try { 
		const fecha = new Date();
		const regresivo = fecha.setMinutes(fecha.getMinutes() - 15) ;

		var result = await pool.query("SELECT * FROM usuario WHERE id =" + user._json.steamid + " LIMIT 1 ");
		if (result=="") {
			pool.query("INSERT INTO usuario (id, nombre, saldo, level, time, ip) VALUES ('"+user._json.steamid+"','"+user._json.personaname+"',0,1,"+regresivo+",'172.25.25.23')" ,(err, result) => {
				if (err) {
					console.log(err);  
				}else{
				
				}
				
			}) 
			pool.query("INSERT INTO inventario (`steamid`, `ticket`, `diamantes`, `xp`, `tesoro1`, `tesoro2`, `tesoro3`, `tesoro4`, `tesoro5`, `tesoro6`) VALUES ('"+user._json.steamid+"',0,0,0,0,0,0,0,0,0)" ,(err, result) => {
				if (err) {
					console.log(err);  
				}
			})
			user._json.saldo="0" ;
			user._json.level="1" ;
		}else{
			
			user._json.saldo=result[0].saldo ;
			user._json.level=result[0].level ;
		}        
		//    user._json.nombre=data.nombre;
		//    user._json.promo=data.promo;
    } catch (error) {
		user._json.saldo="0"; 
		user._json.level="1" ;
		console.log(error)
    }
    
	done(null, user._json);
    
    // console.log(data)
	// done(null, user._json);
}); 

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new SteamStrategy({
	returnURL: localBet+'auth/steam/return'
	, realm: localBet, apiKey: process.env.KEY

}, (identifier, profile, done) => {
	return done(null, profile);
}));
 

const sesion =session({
	key: 'sessionid'
	, secret: 'almatrass'
	, resave: true
	, saveUninitialized: true
	, cookie: {
		maxAge: 86400000
	}
})
app.use(sesion);

app.use(passport.initialize());
app.use(passport.session());

app.get(/^\/auth\/steam(\/return)?$/, passport.authenticate('steam', {
	failureRedirect: '/'
}), (req, res) => {
	res.redirect('/');

});

app.get('/logout', (req, res) => {
	req.logout();

	res.redirect('/');
});
//
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(require('./routes'));
app.use(require('./routes/peticiones'));


server.listen(app.get('port'), function() {
    console.log('Server on port', app.get('port'));
  });