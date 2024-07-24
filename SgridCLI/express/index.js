const express = require('express')
const pkg = require('./package.json')
const app = express()
app.use("/",express.static("./public/dist"))
app.get("/pkg/version",function(req,res){
    return res.json({
        msg:"ok",
        code:0,
        data:pkg.version
    })
})
app.listen(3005,function(){
    console.log('server is running')
})