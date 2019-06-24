#!/usr/bin/env node
//require('../')()
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const route = require('path'); // ruta de mi archivo
const fileHound = require('filehound');
//let route = process.argv[2] //route
// let optionUser = process.argv[3] testing

 
//  is absolute method y resolve pa convdertir en absolute, process argv

// Paso como parámetro la ruta absoluta donde buscará
const readLinks = (path) =>{
      fs.readFile(path,"utf8", (err,data) =>{ // quita esto de aquí
        if(err){
            throw err;
          }
          console.log("Solo los links de ese archivo", data);
          let readLinks =[];
      
          const renderer = new marked.Renderer();
      
          renderer.link = function(href, title, text){
      
            readLinks.push({
              
              href:href,
              text:text,
              //file:path
            
            })
      
          }
          marked(data, {renderer:renderer})
          console.log("Links pusheados en array", readLinks)
          
    }) 
   
        } //Fin función readLinks
    console.log("readLinksConsole", readLinks('./prueba.md'));
    

 //función que me extraerá los md de un directorio
const readDirectory = 
    fileHound.create() //sólo lee directorios
    .discard('node_modules')
    .paths('./testing')
    .ext('md')
    .find();
    readDirectory.then(console.log)

//Process argv
console.log("process arvg", process.argv);
process.argv.forEach((val, index) => {
console.log( "arvg", `${index}: ${val}`);

})

const mdLinks = (path, options) => {

}
module.exports = mdLinks;