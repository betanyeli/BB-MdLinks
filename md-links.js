#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const path = require('path');
const fetch = require('node-fetch'); //links status
let colors = require('colors');
let links = [];

/*Si es un archivo o ruta, llama a la función correspondiente*/ 
const mdLinks = (path) => {
  fs.stat(path, (error, stats) => {
    if (error) {
    console.log("error stats".red, error);
    } if (stats.isFile()) {
    readLinks(path);
    } if (stats.isDirectory()) {
    readRoute(path);
    }
});
//Acá va la lógica de las options

}


/*F(x) para leer links convertida en promesa */ 
const readLinks = (files) => {
  return new Promise ((resolve, reject) => {

  fs.readFile(files, "utf8", (err, data) => {
  
    err ? reject(err) : resolve(links); 
   //console.log("Solo los links de ese archivo", data);
   links = [];

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
    const readDirectory = 
        fileHound.create() //sólo lee directorios
        .discard('node_modules')
        .paths(route)
        .ext('md')
        .find()
            readDirectory.then(read => {
                read.forEach((file) =>{
                    readLinks(file) // Llamo a readlinks
            })
        })
            .catch(err=>{
            console.log(err)
    })

}


// // fetch
const validateLinks = (url) => {
  //urlArray
 url.forEach(element => {
   //urlObject
   fetch(element)
     .then(res => {
       let urlArray = []; //Array de links del fetch
       let urlObject = {}; //Objects del array de links del fetch
       urlObject.url = res.url
       urlObject.ok = res.ok;
       urlObject.status = res.status;
       urlObject.statusText = res.statusText;
       urlArray.push(urlObject);
       console.log(urlArray)
     })     
 }); // fin foreach
}//fin función validateLinks

module.exports= mdLinks;
