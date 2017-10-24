console.time('time');

const fs = require('fs');
var text = "Hello, I am HCH!";

fs.writeFileSync('data_sync.txt', text,'utf8');
console.log('Sync Write File');


var readtext;
try{
	reatext = fs.readFileSync('data_sync.txt', 'utf8');
	console.log("Sync Read File");
}catch(error){
	console.log(error)
}

console.log('Confirm');

console.timeEnd('time');
