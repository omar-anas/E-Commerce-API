require('dotenv').config()
require('../db/connection')
const cors=require('cors')

const express = require('express')
const app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/findAsset/:name", (req,res)=>{
    console.log(req.params.name);
    
    let name = path.join(__dirname, "../public/", req.params.name)
    res.sendFile(name)
})


const userRouter = require('../routes/user.Routes');
const adminRouter = require('../routes/admin.Routes');


app.use('/user',userRouter)
app.use('/admin',adminRouter)


module.exports = app