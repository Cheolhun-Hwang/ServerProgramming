const exitHandler = (code)=>{
	console.log("프로세스가 종료됩니다.");
};

const exceptionHandle = ()=>{
	console.log("예외이벤트가 발생하였습니다.");
};

const onUncaughtException = ()=>{
	console.log('uncaughtException', onUncaughtException);
}

var count = 0;

const timeOut = ()=>{
	count = count +1;
	if(count>5){return;}
	setTimeout(timeOut, 1000);
	error.error();	//의도적 발생
};

process.on('uncaughtException', onUncaughtException);

const timeOutHandler = ()=>{
	setTime
}

process.on("exit", exitHandler);
process.on("uncaughtException", exceptionHandle);
setTimeout(timeOut, 1000);
