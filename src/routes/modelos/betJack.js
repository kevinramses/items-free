const pool = require('../../config/database');

async function betJack(){
    const  consulta3 = await pool.query(`SELECT * FROM bets INNER JOIN tipo ON bets.bets = tipo.bets_id  WHERE tipo.tipo="Global" AND  bo = "JACK" ORDER BY time ASC LIMIT 1`)
    const bets = consulta3;
    var jackpot = []
	var acumulado ;

	      var p1 = bets[0].total1* 100;
			var porc1 = p1/bets[0].total;
			
			var porc3 = bets[0].total*0.10;
			acumulado = 10 + porc3
			
		
		   
			var p2 = bets[0].total2/bets[0].total;
			var porc2 = 100 * p2;

		
	
			porc1=porc1.toFixed(0);
			porc2=porc2.toFixed(0);
			acumulado=acumulado.toFixed(2);

	jackpot[0]={

		id:bets[0].bets,
			team1:bets[0].team1,
			team2:bets[0].team2,
			img1:bets[0].img1,
			img2:bets[0].img2,
			porc1,
			porc2,
			acumulado
	}

	return jackpot
}
module.exports =  betJack;