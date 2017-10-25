const express = require('express');
const router = express.Router();
const jade = require('jade');
const fs = require('fs');

router.use((req, res, next)=>{
    console.log('/quest Connection');
    next();
});

router.use("/", (req, res)=>{
    fs.readFile("quest.jade", "utf8", (err, data)=>{
        if(err){
            res.status(404).send("Error, Load quest.jade Fail.... : " + err);
        }else{
            console.log("Load File Complete");
            const fn = jade.compile(data);
            res.status(200).send( fn() );
        }
    });
});

module.exports = router;