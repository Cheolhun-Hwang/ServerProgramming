const fs = require('fs');

exports.power = 0;
exports.energy = 0;

var checkPower = ()=>{
	if(this.power > 1000){
		this.power=1000;
	}
	if(this.power < 1){
		this.power=1;
	}
}

var checkEnergy = ()=>{
	if(this.energy > 1000){
		this.energy=1000;
	}
	if(this.energy < 1){
		this.energy=1;
	}
}


exports.init = ()=>{
	try{
        	var temp = fs.readFileSync('./avatar.txt', 'utf8');
                var data = temp.split('-');
                this.power = data[0];
                this.energy = data[1];
		console.log('이전 게임 데이터 복구!');
        }catch(e){
		this.power = 30;
		this.energy = 30;
		console.log('처음 시작 초기화!');
        }

}



exports.print = ()=>{
	console.log('-----------------');
	console.log("캐릭터 정보");
	console.log('Power : ' + this.power);
	console.log('Energy : ' + this.energy);
	console.log('-----------------');
}

exports.eat = () =>{
	console.log('밥을 먹습니다.');
	this.power--;
	this.energy++;
	checkPower();
	checkEnergy();
}

exports.exercise = ()=>{
	console.log('운동을 시작합니다.');
	this.power++;
	this.energy--;
	checkPower();
	checkEnergy();
}

exports.sleep = ()=>{
	console.log('잠이 듭니다.');
	this.power--;
	this.energy--;
	checkPower();
	checkEnergy();
}

exports.save = ()=>{
	//저장은 Async로 한다
	fs.writeFile('./avatar.txt', this.power+'-'+this.energy, 'utf8',(err)=>{
		console.log('저장완료!');
	});
}

exports.quit = ()=>{
	console.log('정상종료');
	precoess.exit();
}


