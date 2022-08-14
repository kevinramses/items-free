const pool = require('../../config/database');

async function inventario(datos){
    if(datos === ""){
        var result ={ticket:0,
            diamantes:0,
            xp:0,
            tesoro1:0,
            tesoro2:0,
            tesoro3:0,
            tesoro4:0,
            tesoro5:0,
            tesoro6:0}
        return result
    }else{
        try {
            var result = await pool.query("SELECT * FROM inventario WHERE steamid =" + datos.steamid + " LIMIT 1 ");
            var datosUser ={
            ticket:result[0].ticket,
            diamantes:result[0].diamantes,
            xp:result[0].xp,
            tesoro1:result[0].tesoro1,
            tesoro2:result[0].tesoro2,
            tesoro3:result[0].tesoro3,
            tesoro4:result[0].tesoro4,
            tesoro5:result[0].tesoro5,
            tesoro6:result[0].tesoro6
            }
            return datosUser;
        } catch (error) {
            var result ={ticket:0,
                diamantes:0,
                xp:0,
                tesoro1:0,
                tesoro2:0,
                tesoro3:0,
                tesoro4:0,
                tesoro5:0,
                tesoro6:0}
            return result
        }
    }   
        
}
module.exports = inventario;