'use strict';

const b1 = Buffer.from([57, 51, 52, 53, 54, 55, 56, 57, 58], 'utf8');
const b2 = Buffer.alloc(10).fill('A');

const buffer = Buffer.concat([b1, b2]);

console.log(buffer); // output in url-encode
console.log(buffer.toString('utf8'));
