const pool = require('../../config/database');
const updateSaldo = require('../modelos/updateSaldo');
const selectUser = require('../modelos/selectUser');
const selectInventario = require('../modelos/selectInventario')

async function abrirCofres(tipo,user){
    try {
        var resultado2;
        switch (tipo) {
            case "cofres":
                var result = await selectInventario(user)
                if (result[0].diamantes <= 0) {
                    resultado2 = "no tienes Cofres"
                } else {
                    var result2 = await selectUser(user);

                    var saldoNew = result2[0].saldo + 1;
                    const update = await updateSaldo(saldoNew,user)
                    resultado2 = "Cofres abiertos"

                }
                break;

            case "ticket":
                resultado2 = "exito al depositar ticket";
              break;

              
            default:
                resultado2 = "Looking forward to the Weekend";
          }
          return resultado = resultado2
    } catch (error) {
        console.log(error)
        return resultado="hubo un error"
    }
}
module.exports = abrirCofres;