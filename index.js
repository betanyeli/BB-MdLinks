#!/usr/bin/env node
const mdLinks = require('./md-links');
const process = require('process');
let commandUser = []; //array process vacío.
const validateLinks = require('./md-links')


process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
  commandUser.push(process.argv[index])
})


 if( commandUser[3] === '--validate' && commandUser[4] === '--stats' ||  commandUser[3] === '--stats' && commandUser[4] === '--validate'){
    mdLinks(commandUser[2], {validate:true})
    //llamar validate y stats
 } if (commandUser[3] === '--validate'){
  mdLinks(commandUser[2], {validate:true})
  .then(res => { 
    //console.log(res) mi array de objetos mdLinks
    res.forEach((url) => { 
      //validateLinks(url)
      //console.log("Url si es validate", url)

    })
  })
  .catch(error => {
    console.log(error)
  })
 } if(commandUser[3] === '--stats'){
  mdLinks(commandUser[2], {validate:false})
  .then(res => {
    console.log(res)
    
  })
 } else { commandUser[3] === 0;
  return mdLinks(commandUser[2], {validate:false})
  .then(res => { 
    console.log("without options", res)
    })
 }