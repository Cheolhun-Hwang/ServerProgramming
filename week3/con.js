var	sum=0;
const 	code = 5;

console.time('precessTime');
for(var cnt = 0 ; cnt < 1000 ; cnt ++){
	sum = sum + cnt;
}

console.timeEnd('precessTime');
console.log("loof : %d", cnt);
console.log("loof : ", cnt);
console.log(cnt);
console.log(`반복횟수와 총합계 : ${cnt+sum}`);
console.error('Error# %d', code);
