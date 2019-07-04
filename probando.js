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
  });
    if(commandUser[3] === '--validate' && commandUser[4] === '--stats'){
      options.validate = true;
      options.stats = true;
      return mdLinks(commandUser[2], {options:true})
    }
    if (index === '--validate') {
    options.validate = true;
    }
    if (index === '--stats') {
      options.stats = true;
    }
    



/* sevyundo testing 03 de julio!*/

//  if( commandUser[3] === '--validate' && commandUser[4] === '--stats' ||  commandUser[3] === '--stats' && commandUser[4] === '--validate'){
//     mdLinks(commandUser[2], {validate:true})
//     //llamar validate y stats con su then y catch
//  } if (commandUser[3] === '--validate'){
//   mdLinks(commandUser[2], {validate:true})
//   .then(res => { 
//     //console.log(res) mi array de objetos mdLinks
//     res.forEach((url) => { 
//       validateLinks(url)
//       console.log("Url si es validate", url)

//     })
//   })
//   .catch(error => {
//     console.log(error)
//   })
//  } if(commandUser[3] === '--stats'){
//   mdLinks(commandUser[2], {validate:false})
//   .then(res => {
//     console.log(res)
    
//   })
//  } else { commandUser[3] === 0;
//   return mdLinks(commandUser[2], {validate:false})
//   .then(res => { 
//     console.log("without options", res)
//     })
//  }






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


