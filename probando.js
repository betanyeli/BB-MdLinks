#!/usr/bin/env node
const mdLinks = require('./md-links');
const process = require('process');
let commandUser = []; //array process vacío.
const path = require('path');
let options = {
  validate : false,
  stats: false
}

// commandUser[2] = path.resolve(commandUser[2]);
// commandUser[2] = path.normalize(commandUser[2]);
/*Process arvg position */
  process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
    commandUser.push(process.argv[index])
    if(index === '--validate' && '--stats'){
      options.validate = true;
      options.stats = true;
    }
    if (index === '--validate') {
    options.validate = true;
    }
    if (index === '--stats') {
      options.stats = true;
    }
    });










mdLinks(commandUser[2], options)
                  //mdLinks(commandUser[2])
// .then(res=>{
//   return res;
// })
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


