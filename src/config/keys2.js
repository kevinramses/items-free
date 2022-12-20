require("dotenv").config()
module.exports = {
    database:{
        host:  process.env.HOST2,
        user:  process.env.USER2,
        password: process.env.PASSWORD2, 
        database:  process.env.DATABASE2 ,
        ssl: true
    }
    // database:{
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'V1ramses$',
    //     database: 'abet'
    // }
 
}     