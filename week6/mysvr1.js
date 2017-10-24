const http=require('http');
const fs = require('fs');
const jade=require('jade');

http.createServer((req, res)=>{
	if(req.method=='GET'){
		if(req.url == '/'){
			fs.readFile('reg.jade', 'utf8', (err, data)=>{
				const fn = jade.compile(data);
				res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
				res.end(fn());
			});
		}
	}else if(req.method=='POST'){
		console.log('hey');
		req.on('data', (data)=>{
			console.log('Post Date : ' + data);
			res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
			res.end(data);
		});
	}else{
		console.log('other case requested...');
	}

}).listen(52273, ()=>{
	console.log('Server Running : localhost:52273');
});
