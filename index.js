#!/usr/bin/env node
const mdLinks = require('./md-links')
const process = require('process');
let commandUser = []; //array process vacío.


/*Process arvg position */
process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
  commandUser.push(process.argv[index])
  });

//mdLinks(commandUser[2])
mdLinks(commandUser[2])
.then(res=>{
  return res;
})
// /*Process arvg position */ // testing this way, not working!(preguntar)
// process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
//   //commandUser.push(process.argv[index])
//   if (index=== '--validate'){
//     optionsConsole.validate = true;
//   } if (index === '--stats') {
//     optionsConsole.stats = true;
    
//   }
//   });

//   mdLinks(path, optionsConsole)


