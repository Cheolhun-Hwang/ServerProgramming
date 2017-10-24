const fs = require('fs');
const http = require('http');

var count = 0;

http.createServer((request, res)=>{
	if(request.method == 'GET'){
		if(request.url == '/list'){
			fs.readFile('HTMLPage2.html', (err, data)=>{
				if(err){
					res.writeHead(500, 'utf8', {'Content-Type':'text/plain'});
					res.end("Server : File error");
				}else{
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(data);
				}
			});
		}else if(request.url == '/cart'){
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.write("장바구니 목록\nSkincare Number 2");
			res.end("================================");
		}else if(request.url == '/under'){
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end("공사중....");
		}
	}
}).listen(65501, ()=>{
	console.log("Shopping Mall Server Running at http://127.0.0.1:65501");
});
