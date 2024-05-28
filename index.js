require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./routes/user.route")
const cors = require('cors');
require("./models/index")


const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cors())


app.use("/api/v1/users",userRouter)
app.use((err, req, res, next) => {
    res.status(500).json({
        status:false,
        statusCode:err.statusCode||500,
        message:err.message
    })
})
app.use("/",(req,res)=>{
    res.send({status:false,statusCode:404})
})



app.listen(PORT,()=>{
    console.log('listening on port',PORT)
})