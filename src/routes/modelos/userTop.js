const pool = require('../../config/database');

async function userTop(){

    const consulta4 = await pool.query(`SELECT personaname,idimg,apuesta FROM apuestas INNER JOIN usuario ON apuestas.id_steam=usuario.userId WHERE timeBet BETWEEN DATE_SUB(NOW(),INTERVAL 2 YEAR) AND NOW()  ORDER BY  apuesta DESC LIMIT 3`) 
    const users = consulta4;
    var top =[];
	 users.forEach((user,i)=> {
		 var apuesta=user.apuesta;
		 apuesta= apuesta.toFixed(2);
        top[i]={
			nameId:user.personaname,
			idimg:user.idimg,
			apuesta
		}
		 
	 });
	 return top ;

}

module.exports = userTop;