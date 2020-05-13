'use strict'

const b1 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
// Creates a new Buffer containing UTF-8 bytes of the string 'buffer'.
// where 57 - numerical HTML encoding of the Unicode character

const b2 = Buffer.alloc(10).fill('A')

const buffer = Buffer.concat([b1, b2])

console.log(buffer) // output in UTF-8 (hex.)
console.log(buffer.toJSON()) // output in numerical HTML encoding of the Unicode character
console.log(buffer.toString('utf8'))
