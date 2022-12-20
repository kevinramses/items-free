const pool = require('../../config/database');

async function betId(id) {
    var resul =[];
	var ganador1;
	var ganador2;
	var text1;
	var text2;
	var consulta=await pool.query('SELECT tipo,gameWin FROM tipo WHERE bets_id='+id )	
		consulta.forEach((consult,i)=>{
			if (consult.gameWin=="Team-1") {
				ganador1 = "WIN"
				ganador2 = "LOSS"
				text1 = "text-success"
				text2 = "text-danger"
				
			}else if(consult.gameWin=="Cancelado"){
				ganador1 = "Cancel"
				ganador2 = "Canel"
				text1 = "text-danger"
				text2 = "text-danger"
			}else if(consult.gameWin=="Empate"){
				ganador1 = "Draw"
				ganador2 = "DraW"
				text1 = "text-warning"
				text2 = "text-warning"

			}
			else{
				ganador1 ="LOSS" 
				ganador2 = "WIN"
				text1 = "text-danger" 
				text2 ="text-success"
			}
			resul[i]={
				ganador1,ganador2,text1,text2,tipo:consult.tipo
			}

        })
        return resul ;
}

module.exports = betId;