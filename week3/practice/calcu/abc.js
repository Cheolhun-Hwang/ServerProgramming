const readline = require('readline');
const r = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

var menu = ['Name', 'Age', 'Tel', "Point"];
var content = ['',0,'',0];
var index = 0;
const handlerForaLine = (line)=> {
	content[index] = line;
	index++;
	if(index >= 4){
		r.close();
		console.log("Please check your typing.");
		console.log(content[0]+ " " + content[1] + " " +
				content[2] + " " + content[3]);
		process.exit();	
	}
	r.setPrompt(menu[index]);
	r.prompt()
}

r.setPrompt(menu[index]);
r.prompt();
r.on('line', handlerForaLine);
