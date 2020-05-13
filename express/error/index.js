const buffer = Buffer.from('Marcus');

for (const char of buffer.values()) {
  console.dir({ char }); // char is numerical HTML encoding of the Unicode character
}

for (const [index, char] of buffer.entries()) {
  const symb = String.fromCharCode(char);
  console.dir({ index, char, symb });
}
