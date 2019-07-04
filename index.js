#!/usr/bin/env node
const mdLinks = require('./md-links');
const process = require('process');
let commandUser = []; //array process vacío.
// const validateLinks = require('./md-links')
// const statsUrl = require('./md-links')
process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
  commandUser.push(process.argv[index])
})




 if( commandUser[3] === '--validate' && commandUser[4] === '--stats'){
    mdLinks(commandUser[2], {validate:true})
    .then(res=>{
      console.log("Si validate y stats son verdaderos", res)
    })
    .catch(error => {
      console.log(error)
    })
    //llamar validate y stats con su then y catch
 } else if (commandUser[3] === '--validate'){
  mdLinks(commandUser[2], {validate:true})
  .then(res => { 
    //console.log(res) mi array de objetos mdLinks
    
      //validateLinks(url)
      console.log("Si validate es true", res)

    
  })
  .catch(error => {
    console.log(error)
  })
 } else if(commandUser[3] === '--stats'){
  mdLinks(commandUser[2], {validate:false})
  .then(res => {
    console.log("Si stats is true", res)
    
  })
  .catch(error => {
    console.log(error)
  })
 } else if  (commandUser.length <= 3){
  return mdLinks(commandUser[2]) //si el usuario solo escribe el comando y archivo.
  .then(res => { 
    console.log("Si no hay opción de un coño", res)
    })
  }
 
  
