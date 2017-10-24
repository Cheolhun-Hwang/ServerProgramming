const express = require('express');
const fs = require('fs');
const jade = require('jade');
const router = express.Router();
const mysql = require('mysql');

const client = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user : 'hch',
    password : 'hch',
    database : 'mydb'
});

router.use((req, res, next)=>{
    console.log("Register Page Connect");
    next();
});

router.get('/', (req, res)=>{
    fs.readFile('reg.jade', 'utf8', (err, data)=>{
        if(err){
            console.log("Load reg.jade Fail...");
            res.status(404).send("ERROR : Load Reg.jade Fail.. : " + err);
        }else{
            console.log("Load reg.jade OK...");
            const fn = jade.compile(data);
            res.status(200).send( fn() );
        }
    });
});

router.post('/', (req, res)=>{
    let name = req.body.uname;
    let id = req.body.uid;
    let passwd = req.body.passwd;
    let repasswd = req.body.repasswd;

    if( (name == '' || name == undefined) || (id == '' || id == undefined) || 
    (passwd == '' || passwd == undefined) || (repasswd == '' || repasswd == undefined) || 
    (passwd != repasswd)){
        res.status(500).send("<div align='center'><h1>회원가입 실패</h1><hr><h5>다시 가입해주세요.</h5></div>");
    }else{
        client.query("insert into account values (?, ?, ?)", [id, passwd, name], ()=>{
            console.log("Insert into account OK...");
            res.end();

            res.status(200).redirect('/login');
        });
    }
});



module.exports = router;
