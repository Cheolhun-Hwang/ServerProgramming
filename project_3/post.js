const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const client = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'hch',
    password:'hch',
    database:'mydb'
});

router.use("/", (req, res)=>{
    let name = req.body.uname;
    let dob = req.body.dob;
    let color = req.body.color;
    let phone = req.body.phone;

    if( (name == null || name == undefined) || (dob == '' || dob == undefined) ||
        (color == null || color==undefined) || (phone == '' || phone == undefined) ){
            res.status(500).send("<div align='center'><h1>설문작성 실패</h1><hr><h5>모든 설문 내용을 작성하셔야합니다.</h5></div>");
    }else{
        console.log('Context : ' + name + ", " + dob + ", " + color + ", " + phone);
        client.query("insert into sheet values (?, ?, ?, ?)", [name, dob, color, phone], (err)=>{
            if(err){
                res.status(500).send("Error, Insert Query is failed... : " + err);
            }else{
                console.log("DB insert OK...");
                res.redirect("/result");
            }
        });        
    }
});

module.exports=router;