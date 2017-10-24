const http = require('http');

//서버
//
//
var count = 0;

const myserver = (req, res)=>{
	res.writeHead(200, {'Content-Type':'text/html' });
	res.end('<h1>oh My God!<br>==========</h1>');
}

const server = http.createServer(myserver);

server.on('connection', (code)=>{
	console.log("웹 브라우저에서 나에게 connect 요청을 해왔습니다.!");
});

server.on('request', (code)=>{
	console.log("request 이벤트가 발생되었습니다.");
});

server.listen(56008, ()=>{
	console.log("Server Waiting..56008..");
});

/*server.on('close', ()=>{
	console.log("Exit");
	process.exit();
});*/

/*setTimeout(()=>{
	server.close();
}, 2000);*/
