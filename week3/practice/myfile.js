console.time('Time');


const fs = require('fs');

var text="Hello, I am HCH!";

fs.writeFile('data_asyc.txt', text, 'utf8', (error)=>{console.log('Async Write File');});

var readtext;
fs.readFile('data_asyc.txt', 'utf8', (error,readtext)=>{console.log('Async Read File : ', readtext);});



console.log("Confirm");
console.log('-------------------------------------------------');

console.timeEnd('Time');


