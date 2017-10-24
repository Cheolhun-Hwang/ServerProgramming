const fs = require('fs');
const http = require('http');

var count = 0;

http.createServer((req, res)=>{
	switch(count){
		case 0:
			fs.readFile('HTMLPage2.html', (err, data)=>{
			if(err){
				res.writeHead(500, 'utf8', {'Content-Type':'text/plain'});
				res.end("Server : File error");
			}else{
				res.writeHead(200, {'Content-Type':'text/html'});
				res.end(data);
			}
			});
			count++;
		break;
		case 1:
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.write("장바구니 목록\nSkincare Number 2");
			res.end("\n==============================");
			count++;
		break;
		case 2:
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end("Reset counter (repeat again)");
			count = 0;
		break;
		default:
			console.log("Counter Error(switch)");
		break;
	}
}).listen(65501, ()=>{
	console.log("Shopping Mall Server Running at http://127.0.0.1:65501");
});
