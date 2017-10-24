const express = require('express');
const router = express.Router();

const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');

const client = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'hch',
    password:'hch',
    database:'mydb'
});

router.use((req, res, next)=>{
    console.log('Result page Connect');
    next();
});

router.use('/', (req, res)=>{
    fs.readFile('result.ejs', 'utf8', (err, data)=>{
        if(err){
            res.status(404).send("Error, Load result.ejs Fail... : " + err);
        }else{
            client.query("SELECT * FROM sheet", (err, result)=>{
                if(err){
                    res.status(500).send("Error, Select Query is Failed... : " + err);
                }else{
                    res.status(200).send(ejs.render(data, {
                        data:result
                    }));
                }
            });
        }
    });
});



module.exports = router;