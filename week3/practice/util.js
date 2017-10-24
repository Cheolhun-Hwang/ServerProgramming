const util = require('util');
var object = ['my', 'father', '111'];
var profile = {
	name:'hwangchulhun',
	age:24
};
var mystr;

console.log(util.isArray(object));
console.log(util.isBoolean(object));
console.log(util.isNumber(object));
console.log(util.isNull(object));
console.log(util.isString(object));
console.log(util.isObject(object));
console.log(util.isFunction(object));
console.log(util.isBuffer(new Buffer('Hello world')));
mystr = new Date();
console.log(mystr, '->', util.isDate(mystr));
mystr = util.format('%s(%d)\n%j', profile.name, profile.age, profile);
console.log(mystr)
