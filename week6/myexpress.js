const express = require('express');

const app = express();

app.use((req, res, next)=>{
	let name = req.query.name;
	let region = req.query.region;
	const agent = req.header('User-Agent');

	console.log(req.headers);
	if(agent.toLowerCase().match(/firefox/)){
		res.status(200).send('<h2>웹브라우저:firefox <br>'+name + ':'+region+'</h2>');
	}else if(agent.toLowerCase().match(/chrome/)){
		res.status(200).send('<h2>웹브라우저:chrome <br>'+name + ':'+region+'</h2>');
	}else{
		res.status(500).send('<h2>웹브라우저:other <br>'+name + ':'+region+'</h2>');
	}
});

app.listen(52273, ()=>{
	console.log('Server Running : localhost:52273 ');
});
