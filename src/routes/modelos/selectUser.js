const pool = require('../../config/database');

async function selectUser(user){
   try {
    const result = await pool.query("SELECT * FROM usuario WHERE id=" + user + " LIMIT 1 ");
    return result 
   } catch (error) {
       console.log(erro)
       return resultado="error";
   }
}
module.exports = selectUser;