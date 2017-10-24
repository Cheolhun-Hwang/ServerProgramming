setTimeout(function () {console.log("1sec arm!");}, 1000);
setTimeout(function () {console.log("2sec arm!");}, 2000);
setTimeout(() =>  {console.log("3sec arm!");}, 3000);
setTimeout(function () {console.log("5sec arm!");}, 5000);
setTimeout(function () {console.log("7sec arm!");}, 7000);
const id = setTimeout(() => 
	{console.log("10sec arm!");}, 10000);
clearTimeout(id);
setInterval(()=> {console.log("4sec arm!!")}, 4000);
