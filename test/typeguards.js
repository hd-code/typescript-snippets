const tg = require('../build/typeguards');

const person = {
    firstname: 'Jane',
    lastname: 'Fonder',
};

console.log(tg.isKey(person, 'firstname'));
console.log(tg.isKey(person, 'firstname', tg.isString));
console.log(tg.isKey(person, 'firstname', tg.isNumber));

console.log('---');

console.log(tg.isKey(person, 'firstnam'));
console.log(tg.isKey({}, 'firstname'));
console.log(tg.isKey({lastname: 'Fonder'}, 'firstname'));
console.log(tg.isKey(3, 'firstname'));
console.log(tg.isKey('test', 'firstname'));
console.log(tg.isKey(null, 'firstname'));