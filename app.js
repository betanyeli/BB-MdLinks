const fs = require('fs');
let readMe = fs.readFileSync('README.md', 'utf8');
console.log(readMe);
//testing lectura de archivo MD