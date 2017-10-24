const http=require('http');

http.createServer((req, res)=>{
	const date = new Date();
	date.setDate(date.getDate + 7);

	//쿠키입력
	res.writeHead(200, {'Content-Type' : 'text/html',
			'Set-Cookie' : [
			'breakfast = toast;Expire = ' + 
			date.toUTCString(),
			'dinner = chicken']
	});

	res.end('<h1>' + req.headers.cookie + '</h1>');
}).listen(55273, ()=>{
	console.log('Server Running at http://127.0.0.1:52273');
});
