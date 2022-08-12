const express = require('express');
const router = express.Router();
const pool = require('../config/database');

require("dotenv").config() 

router.post('/recolectar', async  (req, res) => {
    try {
        var user = req.user || "";
        if (user === "") {
            res.json({ estado: "Inicia sesión", succes: "error" });
        } else {
            var usuario = user.steamid
            const fecha = new Date();

            var minutos = parseFloat(process.env.TIME) ;
            const resultFecha = fecha.setMinutes(fecha.getMinutes());
            const regresivo = fecha.setMinutes(fecha.getMinutes() + minutos);
            var result = await pool.query("SELECT `id`, `level`, `time`, `diamantes`,`ticket` FROM `usuario` INNER JOIN inventario ON usuario.id=inventario.steamid WHERE id =" + usuario + " LIMIT 1 ");
            var level = result[0].level;
            if (result[0].time > resultFecha) {
          
                res.json({ estado: "falta de tiempo", succes: "error" });

            } else {
            
                await pool.query("UPDATE usuario Set time=? WHERE id=?", [regresivo, usuario], (err, resultado) => {
                    if (err) {
                        res.json({ estado: "erro con el servidor1", succes: "error" });
                    } else {
                        var diamante =result[0].diamantes + level;
                        var ticket =result[0].ticket + level;
                        pool.query("UPDATE inventario Set diamantes=?,ticket=? WHERE steamid=?", [diamante,ticket, usuario], (err, resultado) => {
                            if (err) {
                                console.log(err)
                                res.json({ estado: "erro al recolectar tesoro2", succes: "error" });
                            } else {
                               
                                pool.query("INSERT INTO recolectar (steamuser,tipo,datetime) VALUES ('"+usuario+"','diamantes',NOW())" ,(err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.json({ estado: "erro al recolectar tesoro1", succes: "error" }); 
                                    }else{
                                        res.json({ estado: "tesoro recolectado", succes: "success" }); 
                                    }
                                })
                            }
                        })
                        
                    }
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({ estado: "erro con el servidor2", succes: "error" });
    }
  });
module.exports = router;