const pool = require('../../config/database');


async function peticionUser(datos){
    const fecha = new Date();
    const regresivo = fecha.setMinutes(fecha.getMinutes() + 15);
    if(datos === ""){
        var result ={level:1,time:regresivo}
        return result
    }else{
        try {
            var result = await pool.query("SELECT * FROM usuario WHERE id =" + datos.steamid + " LIMIT 1 ");
            var datosUser ={
            level:result[0].level,
            time:result[0].time
            }
            return datosUser;
        } catch (error) {
            var result ={level:1,time:regresivo}
            return result
        }
        
        
    }
    
}
module.exports = peticionUser;