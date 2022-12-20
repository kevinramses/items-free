const pool = require('../../config/database');
async function valresId(id) {
    var porc=[];
	var consulta=await pool.query('SELECT total1,total2,total FROM tipo WHERE id='+id )
				
		consulta.forEach((consult,i)=>{
			var {total1,total2,total}=consult;	
	
			var p1 = total1 * 100;
			var porc1 = p1/total;
			var pc1=(total1/total)*100;
			
		
		   
			var p2 = total2/total;
			var porc2 = 100 * p2;
			var pc2=(total2/total)*100;

			if (pc1 <= 30) {
				if (pc1 <= 24) {
					if (pc1 <= 14) {
						if (pc1 <= 7) {
							pc1 = pc1 + 4;
						
						} else {
							pc1 = pc1 + 3.5;
							
						}
					} else {
						pc1 = pc1 + 2.5;
						
					}
			
				} else {
					pc1 = pc1 + 1;
					
				}
			}
			if(pc1<95){
				pc1 = 5 + pc1;
				
			}
			var xpor1 = 100 / pc1;
			
	
			if (pc2 <= 30) {
				if (pc2 <= 24) {
					if (pc2 <= 14) {
						if (pc2 <= 7) {
							pc2 = pc2 + 4;
							
						} else {
							pc2 = pc2 + 3.5;
						
						}
					} else {
						pc2 = pc2 + 2.5;
					
					}
			
				} else {
					pc2 = pc2 + 1;
					
				}
			}
			if(pc2<95){
				pc2 = 5 + pc2;
				
			}
			var xpor2 = 100 / pc2;
		
	
			porc1=porc1.toFixed(0);
			porc2=porc2.toFixed(0);
			xpor1 = xpor1.toFixed(2);
			xpor2 = xpor2.toFixed(2);
			
			porc[i]={
				porc1:porc1,
				porc2:porc2,
				total1:total1,
				total2:total2,
				total:total,
				xpor1,
				xpor2
				}
			 
        })
        return porc
  }
  module.exports = valresId;