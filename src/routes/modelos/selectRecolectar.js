const pool = require('../../config/database');

async function selectRecolectar(user){

        try {
            var detalle;
            var img;
            const result = await pool.query("SELECT * FROM recolectar INNER JOIN usuario ON usuario.id=recolectar.steamuser WHERE steamuser='"+user+"' order by recolectar.id desc   LIMIT 1;");

            if (result[0].tipo==="diamantes") {
                detalle=result[0].detalle;
                img="gem.png"
            } else if(result[0].tipo==="cofres"){
                detalle=result[0].detalle;
                img="treasures.png"
            }
            return resultado ={tipo:result[0].tipo,detalle:detalle,img:img,saldo:result[0].saldo}
           } catch (error) {
               console.log(error)
               var result2 ={tipo:"error",detalle:"error",img:"triangle2",saldo:"--"}
               return resultado=result2;
           }
}
module.exports = selectRecolectar;