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
require('./config/socket').connection(server);
const axios = require('axios');

require("dotenv").config()
//var
const localBet = process.env.LOCAL;
const backend = process.env.BACK;


//
passport.serializeUser(async(user, done) => {
	try {
		const { data } = await axios.post(backend+'saldo', { id: user._json.steamid, profile: user._json.personaname })
		user._json.saldo = data.saldo;
		user._json.nombre = data.nombre;
		user._json.promo = data.promo;
	} catch (error) {
		console.log(error)
		user._json.saldo = "5";
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
		maxAge: 8640000000
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