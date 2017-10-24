const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const r = readline.createInterface({
        input:process.stdin,
        output:process.stdout
});


var storeMenu = ['사이트명 :', '인터넷주소 :', '아이디 :', '비밀번호 :'];
var storeContent = ['','','',''];
var storeMenuNum = 0;
var text;
var key = 'hch';
var type;
var option;

var storeShowTitle = () => {
	console.log("-----------------------------------------");
	console.log("사이트정보 등록프로그램 v1.0 (암호화저장)")
	console.log("-----------------------------------------");
}

var restoreShowTitle = ()=>{
	console.log("-----------------------------------------");
        console.log("사이트정보 등록프로그램 v1.0 (복호화조회)")
        console.log("-----------------------------------------");
}

const handlerStore = (line)=>{
        storeContent[storeMenuNum] = line;
        storeMenuNum++;
        if(storeMenuNum >= 4){
                r.close();
                
		text = storeMenu[0] + storeContent[0]+"\n"+
                       storeMenu[1] + storeContent[1] + "\n"+
                       storeMenu[2] + storeContent[2] + "\n"+
                       storeMenu[3] + storeContent[3] + "\n";

			

                
		var cipher = crypto.createCipher('aes192', key);
                var encryptedPassward = cipher.update(text, 'utf8', 'base64');
                var cipheredOutput = encryptedPassward + cipher.final('base64');

                //저장될 때까지 홀드 시킨다. 에러방지
                fs.writeFile('siteinfo.txt', cipheredOutput, 'base64', (error)=>{
		console.log("암호화하여 파일로 저장하였습니다.");
                process.exit();

		});
        }
        r.setPrompt(storeMenu[storeMenuNum]);
        r.prompt();
                                                                      }

const storeFunction = () =>{
	r.setPrompt(storeMenu[storeMenuNum]);
        r.prompt();
        r.on('line', handlerStore);
}

const restoreFunction = () =>{

	fs.readFile('siteinfo.txt', 'base64', (error, text)=>{
		var decipher = crypto.createDecipher('aes192', key);
        var decryptedPassward = decipher.update(text, 'base64', 'utf8');
        var decipherOutput = decryptedPassward + decipher.final('utf8');


        console.log("복조화하여 siteinfo 파일에서 가져왔습니다.");
        console.log(decipherOutput);
	process.exit();
	});

	
}

process.argv.forEach((item, index) => {
	if(item == '-store'){
		storeShowTitle();
		type=0;
        	return;
		console.log("hey");
	}else if(item == '-restore'){
		restoreShowTitle();
		type=1;
		return;
	}else{
	}
});


if(type ==0){
	storeFunction();
}else if(type ==1){
	restoreFunction();
}
