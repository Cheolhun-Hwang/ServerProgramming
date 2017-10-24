const express=require('express');
const reg = require('./reg.js');
const login = require('./login.js');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use( cookieParser() );
app.use(bodyParser.urlencoded({extended : false}));

app.listen(55602, ()=>{
    console.log("Server Running : 55602");
});

app.use((req, res, next)=>{
    console.log("Connect Time : " + (new Date()).toUTCString);
    next();
});

app.use('/', reg);
app.use('/login', login);