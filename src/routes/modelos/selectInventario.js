const pool = require('../../config/database');

async function selectInventario(user){
   try {
    const result = await pool.query("SELECT * FROM inventario WHERE steamid=" + user + " LIMIT 1 ");
    return result 
   } catch (error) {
       console.log(erro)
       return resultado="error";
   }
}
module.exports = selectInventario;