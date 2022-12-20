const pool = require('../../config/database');

async function userJack(){

    const consulta5 = await pool.query(`SELECT personaname, apuesta ,idimg FROM apuestas INNER JOIN usuario ON usuario.userId=apuestas.id_steam  WHERE equipo= "p" LIMIT 1`)
    const users = consulta5;
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

module.exports = userJack;

