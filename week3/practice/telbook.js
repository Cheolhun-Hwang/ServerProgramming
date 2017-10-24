const data = require('./pra01.js');

console.time('실행시간');
console.log("=== 주소록에 등록할 정보입니다. ====");
console.log("이름 : ", data.getName());
console.log("나이 : ",  data.getAge());
console.log("핸드폰 : ", data.getTel());
console.log("------------------------------------")

console.timeEnd('실행시간');
