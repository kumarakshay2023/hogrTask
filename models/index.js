const sequelize = require("../db/conn");

const User = require("./user")



sequelize.sync({force:false,logging:false}).catch((err)=>console.log(err));

module.exports={
    User
}