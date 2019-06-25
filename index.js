#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
//const route = require('path'); // ruta de mi archivo
const fileHound = require('filehound'); // read directory
const fetch = require('node-fetch'); //links status
let command = []; //array process vacío.
let links = [];

//Process argv

//console.log("process arvg", process.argv);
process.argv.forEach((val, index) => {
  command.push(process.argv[index])
})
console.log("command", command);

//process arvg position

fs.stat(command[2],(error, stats) =>{

  if (error){
console.log("error stats", error);
} if (stats.isFile()) {
  readLinks(command[2]);
} if (stats.isDirectory()){
  readRoute(command[2]);
}
console.log("isFile", stats.isFile());
console.log("isDirectory", stats.isDirectory());


  });

// Paso como parámetro la ruta absoluta donde buscará
const readLinks = (files) =>{
      fs.readFile(files,"utf8", (err,data) =>{ // quita esto de aquí
        if(err){
            throw err;
          }
          console.log("Solo los links de ese archivo", data);
          //let links = [];
      
          const renderer = new marked.Renderer();
      
          renderer.link = function(href, title, text){
      
            links.push({
              
              href:href,
              text:text,
              //file:path
            
            })
      
          }
          marked(data, {renderer:renderer})
          console.log("Links pusheados en array", links)
          
          scanLinks(links)
    }) 
    
        } //Fin función readLinks
   //console.log("readLinksConsole", readLinks('./prueba.md')); este console no va
    
    

 //función que me extraerá los md de un directorio
const readRoute = (route) => {
  const readDirectory = 
  fileHound.create() //sólo lee directorios
  .discard('node_modules')
  .paths(route)
  .ext('md')
  .find();
 
  readDirectory.then((marico) => console.log(marico));
}
    


// fetch
const scanLinks = (url) => {
  url.forEach(element => {
    fetch(element.href)
    .then(res => {
      console.log("true or false", res.ok);
      console.log("number", res.status);
      console.log("ok or not found", res.statusText);
     
  });
  })

  
}
  

  

// const mdLinks = (path, options) => {

// }
// module.exports = mdLinks;