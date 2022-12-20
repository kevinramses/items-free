require("dotenv").config()
module.exports = {
    database:{
        host:  process.env.HOST,
        user:  process.env.USER,
        password: process.env.PASSWORD, 
        database:  process.env.DATABASE 
    }
    // database:{
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'V1ramses$',
    //     database: 'abet'
    // }
 
}      