const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'gachon654321',
	database: 'mydb'
});

const app = express();

app.listen(65001, ()=>{
	console.log('Server Running : 65001');
});

app.get('/insert', (req, res)=>{
	console.log('/insert get call');
	fs.readFile('9-insert.html', 'utf8', (err, data)=>{
		res.send(data);
		console.log('9-insert.html Load');
	});
});

app.get('/member', (req, res)=>{
	console.log('/member get call');
	fs.readFile('9-list.html', 'utf8', ()=>{
		console.log('9-list.html Load');
		client.query('SELECT * FROM member', (err, results)=>{
			console.log('Select * from member call');
			res.send(ejs.render(data, {data:results}));
			console.log('DB connect and render OK');
		});
	});
});

app.post('/insert', (req, res)=>{
	var body = req.body;
	console.log(body.name);
	console.log(body.uid);
	console.log(body.pass);
	
	client.query('INSERT INTO member (name, uid, pass) VALUES (?, ?, ?)', [body.name, body.uid, body.pass], ()=>{
	console.log('Insert into DB OK!');
	res.end();
	});
});
