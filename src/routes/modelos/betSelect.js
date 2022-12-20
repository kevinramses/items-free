const pool = require('../../config/database');


async function betSelect(){
    const consulta = await pool.query(`SELECT * FROM tipo INNER JOIN bets ON tipo.bets_id = bets.bets WHERE bets.win="Pendiente" AND tipo.tipo="Global" ORDER BY time ASC` );
    const crono = consulta;
    var now = new Date();
	
	var time;
	var cronometro=[];
	for (let i = 0; i < crono.length; i++) {
		
		var tiempo = (new Date(crono[i].time)-now+1000)/1000;
	    var minutos =('0'+Math.floor(tiempo / 60 % 60 )).slice(-2);
		var horas = ('0'+Math.floor(tiempo / 3600 % 24 )).slice(-2);
		var dias = Math.floor(tiempo/(3600*24));
		if (dias>=1) {
			time =dias+"d:"+horas+"h"
			
		}else{
			if (now>crono[i].time) {
				time ="En Vivo"	
				
				
			}else{
				time =horas+"h:"+minutos+"m"
			}
			
		}

			var p1 = crono[i].total1* 100;
			var porc1 = p1/crono[i].total;
		
			
		
		   
			var p2 = crono[i].total2/crono[i].total;
			var porc2 = 100 * p2;

		
	
			porc1=porc1.toFixed(0);
			porc2=porc2.toFixed(0);



		
		cronometro[i]={
			id:crono[i].bets,
			team1:crono[i].team1,
			team2:crono[i].team2,
			img1:crono[i].img1,
			img2:crono[i].img2,
		    game:crono[i].game,
			bo:crono[i].bo,
			win:crono[i].win,
			time:time,
			torneo:crono[i].torneo,
			ico:crono[i].ico,
			porc1,
			porc2
		}
		
	}
	
	return cronometro
   
}

module.exports = betSelect;