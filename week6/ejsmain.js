const http=require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer((req, res)=>{
	fs.readFile('7-8.ejs', 'utf8', (err, data)=>{
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<mata charset=utf8>');
		res.end(ejs.render(data, {
			name : 'ejs실습문제',
			description : 'Hello ejs With Node.js'
		}));
	});	
}).listen(52273, ()=>{
	console.log("Server Running at localhost:52273");
});
