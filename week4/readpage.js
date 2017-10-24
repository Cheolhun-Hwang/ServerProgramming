const fs = require('fs');
const http = require('http');

http.createServer((req, res)=>{
	fs.readFile('HTMLPage.html', (err, data)=>{
		if(err){
			res.writeHead(500, 'utf8', {'Context-Type' : 'text/plain'});
			res.end('Server : File error!');
		}else{
			res.writeHead(200, {'Context-Type' : 'text/html'});
			res.end(data);
		}
	});
}).listen(52273, ()=>{
	console.log('Server Running at http://127.0.0.1:52273');
});
