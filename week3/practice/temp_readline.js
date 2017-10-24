const readline = require('readline');
const r = readline.createInterface({
        input:process.stdin,
        output:process.stdout
});


var storeMenu = ['사이트명 :', '인터넷주소 :', '아이디 :', '비밀번호 :'];
var storeContent = ['','','',''];
var storeMenuNum = 0;
var text;


const handlerStore = (line)=>{
        storeContent[storeMenuNum] = line;
        storeMenuNum++;
        if(storeMenuNum >= 4){
                r.close();
                text = storeMenu[0] + storeContent[0]+"\n"+
                       storeMenu[1] + storeContent[1] + "\n"+
                       storeMenu[2] + storeContent[2] + "\n"+
                       storeMenu[3] + storeContent[3] + "\n";
	console.log(text)
	}

	r.setPrompt(storeMenu[storeMenuNum]);
        r.prompt();
}

	console.log("-----------------------------------------");
        console.log("사이트정보 등록프로그램 v1.0 (암호화저장)")
        console.log("-----------------------------------------");

	
process.argv.forEach((item, index) => {
        var option = process.argv[index+2];

        if(option == undefined){
                console.log("설정값이 없습니다.\n"+
                                "       -store : 저장\n"+
                                "       -restore : 불러오기\n");
        }else{
        r.setPrompt(storeMenu[storeMenuNum]);
        r.prompt();
        r.on('line', handlerStore);


        }

        process.exit();
});



	r.setPrompt(storeMenu[storeMenuNum]);
        r.prompt();
        r.on('line', handlerStore);

