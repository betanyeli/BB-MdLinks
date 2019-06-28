#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const path = require('path');
const fetch = require('node-fetch'); //links status
let colors = require('colors');
//const mdLinks = require('./md-links')
let commandUser = []; //array process vacío.
let links = [];


// let options = {
//   stats: false,
//   validate: false,
// }


//Process argv

//console.log("process arvg", process.argv);
process.argv.forEach((val, index) => { // no quitar val!
  commandUser.push(process.argv[index])
  });
  //console.log("command", commandUser);

/*Si es un archivo o ruta, llama a la función correspondiente*/ 
const fileOrDirectory = (path) => {
  fs.stat(path, (error, stats) => {

    if (error) {
    console.log("error stats".red, error);
    } if (stats.isFile()) {
    readLinks(path);
    } if (stats.isDirectory()) {
    readRoute(path);
    }
  console.log("isFile", stats.isFile());
  console.log("isDirectory", stats.isDirectory());
});

}
fileOrDirectory(commandUser[2])



/*F(x) para leer links convertida en promesa */ 
const readLinks = (files) => {
  new Promise ((resolve, reject) => {

  fs.readFile(files, "utf8", (err, data) => {
  
    err ? reject(err) : resolve(links); 
   //console.log("Solo los links de ese archivo", data);

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {

      links.push({
        href: href,
        text: text,
        title:title
       

      });

    } //fin rendered
    marked(data, { renderer: renderer })
    validateLinks(links)
    //resolve(links)
  }) //fin readFiles
  })
 
} //Fin función readLinks


/*F(x) que lee directorios, posteriormente llama a readLinks*/
const readRoute = (route) => {
  return fileHound.create() //sólo lee directorios
      .discard('node_modules')
      .paths(route)
      .ext('md')
      .find()
      .then(read => {
      read.forEach((file) =>{
      readLinks(file) // Llamo a readlinks
    
    })
  })
  .catch(err=>{
    console.log(err)
  })
  
}


// fetch
const validateLinks = (url) => {
     //urlArray
    url.forEach(element => {
      //urlObject
      fetch(element)
        .then(res => {
          let urlArray = []; //Array de links del fetch
          let urlObject = {}; //Objects del array de links del fetch
          urlObject.url = res.url;
          urlObject.ok = res.ok;
          urlObject.status = res.status;
          urlObject.statusText = res.statusText;
          urlArray.push(urlObject);
          console.log(urlArray)
        })     
    }); // fin foreach
}//fin función validateLinks