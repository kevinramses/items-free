const pool = require('../../config/database');
var timeAgo = require('node-time-ago');
async function apuestasId(id) {
    var consu = await pool.query('SELECT name_id,apuesta,tipo,timeBet,team1,img1,equipo,team2,img2,idimg,personaname FROM apuestas INNER JOIN usuario ON apuestas.id_steam = usuario.userId INNER JOIN tipo ON apuestas.id_bet= tipo.id INNER JOIN bets ON tipo.bets_id = bets.bets   WHERE be='+id+' ORDER BY id_apuesta DESC LIMIT 6');
	var apuestas =[] ;
	
	consu.forEach((ele , i) => {
		var {name_id,apuesta,tipo,timeBet,team2,img2,team1,img1,equipo,idimg,personaname}= ele;

		var time = timeAgo(timeBet);
		var sal = apuesta.toFixed(2);
		
		if (equipo=="t") {
			apuestas[i]={name:personaname,sal,tipo,time,team:team1,img:img1,idimg}
		}else{
			 apuestas[i]={name:personaname,sal,tipo,time,team:team2,img:img2,idimg}
		}
		   
		
    });
    return apuestas;
  }
  module.exports = apuestasId;