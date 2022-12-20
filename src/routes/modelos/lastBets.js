const pool = require('../../config/database');

async function lastBets(){
    const consulta2 = await pool.query(`SELECT bets, team1, team2, img1, img2,game, time,gameWin,bo FROM bets INNER JOIN tipo ON bets.bets=tipo.bets_id WHERE win="Finalizado"  AND tipo.tipo="Global"  ORDER BY time DESC LIMIT 14` );
    const resultados = consulta2;
    var last = [];
	
	resultados.forEach((resul,i) => {
	    var {team1,team2,img1,img2,game,time,gameWin,bets,bo}= resul;
		var f = new Date(time);
		var ganador ;
		var mes = 1+parseInt(f.getMonth()) 
		var newtime = f.getDate() + "/"+ mes+ "/" +f.getFullYear();
		

		if (gameWin=="Team-1") {
			ganador = 1
		} else if(gameWin=="Cancelado") {
			ganador = 3
		}else if(gameWin=="Empate") {
			ganador = 4
		}
		else{
			ganador = 2
		}
	     
		last[i]= {
			team1,team2,img1,img2,game,newtime,ganador,bets,bo
		}
		
	});
	return last
}
module.exports = lastBets;