const url = require('url');

var parseObject = url.parse("http://www.hanbit.co.kr:8009/store/books/look.php?p_code=B1234");

console.log(parseObject);
console.log(parseObject.protocol);
console.log(parseObject.hostname);
console.log(parseObject.port);
