const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const abrirCofres = require('./funciones/abrirCofres')

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
            setTimeout(async function(){  
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
                               
                                pool.query("INSERT INTO recolectar (steamuser,tipo,datetime,detalle) VALUES ('"+usuario+"','cofres',NOW(),'+"+level+" Cofres obtenidos')" ,(err, result) => {
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
        }, 1000);
        }
    } catch (error) {
        console.log(error)
        res.json({ estado: "erro con el servidor2", succes: "error" });
    }
  });

router.post('/cofres', async  (req, res) => {
   
    var user = req.user ||"";
    if (user === "") {
        res.json({ estado: "Inicia sesión", succes: "error" });
    } else {
        const { id } = req.body;
        const result = await abrirCofres(id, req.user.steamid);
        if(result==="exito al depositar ticket"){
            res.json({ estado: result,detalle:"ticket", succes: "success" });
        }else if(result==="experiencia añadidad"){
            res.json({ estado: result,detalle:"xp", succes: "success" });
        }
        else{
            setTimeout(function(){
                res.json({ estado: result,detalle:"diamante", succes: "error" });
            }, 1000);
           
        }
       
    }
  });
   

module.exports = router;