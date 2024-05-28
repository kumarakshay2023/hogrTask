const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:process.env.DB_DAILACT
})
sequelize.authenticate().then(()=>console.log("Database Connected Successfully")).catch((err)=>
 console.log("Error while connecting",err)
)

module.exports=sequelize;