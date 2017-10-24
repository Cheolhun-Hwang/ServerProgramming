/* 메인 컨테이너 */
const express = require('express');
const bodyParser = require('body-parser');

const servey = require('./servey.js');
const post = require('./post.js');
const info = require('./info.js');

const app =express();

app.use( bodyParser.urlencoded({extended:false}));

app.listen(55602, ()=>{
    console.log("Server Running : 55602");
});

app.use((req, res, next)=>{
    console.log("Connect Server : " + (Date.now()));
    next();
});

app.get("/quest", servey);

app.post("/quest", post);

app.get("/result", info);