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
//var
const localBet = "https://items-free.herokuapp.com/";
const axios = require('axios');
//
passport.serializeUser(async(user, done) => {
    try {  const {data} = await axios.post('http://localhost:4001/saldo',{  id:user._json.steamid,profile:user._json.personaname})
           user._json.saldo=data.saldo;
		   user._json.nombre=data.nombre;
		   user._json.promo=data.promo;
    } catch (error) {
        user._json.saldo="";
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
	, realm: localBet, apiKey: "0D54C1C4829E0E28B063C310B8E8DC4E"

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


server.listen(app.get('port'), function() {
    console.log('Server on port', app.get('port'));
  });