const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const r = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

var menu = ['사이트명: ', '인터넷주소 : ', '아이디 : ', '비밀번호: '];
var content = ['','','',''];
var index = 0;
var writetext;
var readtext;
var key = 'hch';

const handlerStore = (line)=>{
	content[index] = line;
	index++;
	if(index >= 4){
		r.close();
		writetext = menu[0] + content[0]+"\n"+
				menu[1] + content[1] + "\n"+
				menu[2] + content[2] + "\n"+
				menu[3] + content[3] + "\n";
		var cipher = crypto.createCipher('aes192', key);
		cipher.update(writetext, 'utf8', 'base64');
		var cipheredOutput = cipher.final('base64');
		
		//저장될 때까지 홀드 시킨다. 에러방지
		fs.write("siteinfo.txt", cipheredOutput, 'utf8');
		console.log("암호화하여 파일로 저장하였습니다.")
	}

	r.setPrompt(menu[index]);
	r.prompt();
}





process.argv.forEach((item, index)=>{

var showup = ()=> {
	console.log("-------------------------------------------");
}


if(item == '-store'){
	this.showup;
	console.log("사이트정보 등록프로그램  v1.0 (암호화저장)");
	this.showup;

	r.setPrompt(menu[index]);
	r.prompt();
	r.on('line', handlerStore);
	
}else if(item == '-restore'){
	showup;
        console.log("사이트정보 등록프로그램  v1.0 (복호화조회)");
        this.showup;

	try{
	readtext = fs.readFileSync('siteinfo.txt', 'utf8');
	
	var decipher = crypto.reateDecipher('aes192', key);
	decipher.update(readtext, 'base64', 'utf8');
	var decipherOutput = decipher.final('utf8');

	console.log("복조화하여 siteinfo 파일에서 가져왔습니다.");
	console.log(decipherOutput);

	
	}catch(error){
		console.log(error);
		console.log("파일이 있는지 확인해주세요.");
	}

}else{
	console.log('Wrong Require. please check your pramata.');
}


})
