const pool = require('../../config/database');
const selectInventario = require('./selectInventario');
const inventario = require('../funciones/inventario');

async function updateSaldo(saldo, user){
   try {
    var resultado2
    pool.query("UPDATE usuario Set saldo=? WHERE id=?", [saldo, user], (err, res) => {
        if (err) {
            console.log(err)
        } 
    })
    var inventario = await selectInventario(user)
    var newDiamantes = inventario[0].diamantes -1;
    pool.query("UPDATE inventario Set diamantes=? WHERE steamid=?", [newDiamantes, user], (err, res) => {
        if (err) {
            console.log(err)
        }
    })
    pool.query("INSERT INTO recolectar (steamuser,tipo,datetime,detalle) VALUES ('"+user+"','diamantes',NOW(),'+1 diamante')" ,(err, result) => {
				if (err) {
					console.log(err);  
				}else{
				}
				
			}) 
    return result = resultado2;
   } catch (error) {
       console.log(erro)
   }
}
module.exports = updateSaldo;