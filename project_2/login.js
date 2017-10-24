const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jade = require('jade');
const fs = require('fs');

const client = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'hch',
    password:'hch',
    database:'mydb'
});

router.use((req, res, next)=>{
    console.log("Login Page Connect...");
    next();
});

router.get('/', (req, res)=>{
    fs.readFile('login.jade', 'utf8', (err, data)=>{
        if(err){
            console.log("Load login.jade Fail...");
            res.status(404).send("Error, Load Login.jade Fail : " + err);
        }else{
            const fn = jade.compile(data);
            res.status(200).send( fn() );
        }
    });
});

router.post('/', (req, res)=>{
    let id = req.body.uid;
    let passwd = req.body.passwd;
    let name;

    client.query("SELECT * FROM account", (err, result)=>{
        for(var i = 0 ; i<result.length ; i++){
            //console.log(result[i].id +" / " + result[i].passwd + " / " + result[i].name);
            if(result[i].id == id && result[i].passwd == passwd){
                name = result[i].name;
                fs.readFile('welcome.jade', 'utf8', (err, data)=>{
                    if(err){
                        //res.end();
                        console.log("Load Welcome.jade Fail...");
                        res.status(404).send("Error, Load Welcome.jade Fail : " + err);
                    }else{
                        //res.end();
                        const fn = jade.compile(data);
                        res.status(200).send( fn({
                            uname : name
                        }) );
                    }
                });
            }
        }
        if(name == '' || name==undefined){
            //res.end();
            res.status(500).send("<div align='center'><h1>로그인 실패</h1><hr><h5>회원가입 하셨나요? <br>아이디 비번을 찾을 수 없습니다.</h5></div>");
        }
        
    });
});

module.exports = router;