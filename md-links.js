#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const path = require('path');
const fetch = require('node-fetch'); //links status
const chalk = require('chalk');
let links = [];


/*Si es un archivo o ruta, llama a la función correspondiente*/ 
const mdLinks = (path, options) => {
  return new Promise ((resolve, reject) => {
    fs.stat(path, (error, stats) => {

      if (error) {
        reject(error)   
        
        } if (stats.isFile()) {
          readLinks(path)
          .then(url => {
           resolve(validateLinks(url))
           //console.log(validateLinks(url)) //return promise pending! fix this bug!
              
                
              })
          
     
      
      } if (stats.isDirectory()) {
      resolve(readRoute(path))
  
      } 
      if(!stats.isDirectory()){
        console.log("Debes introducir un directorio / archivo válido")
      }
          
          //console.log(url)
       

  });
 
  });
  
  

}


/*F(x) para leer links convertida en promesa */ 
const readLinks = (files) => {
  return new Promise ((resolve, reject) => {

  fs.readFile(files, "utf8", (err, data) => {
  
    err ? reject(err) : resolve(links); 
   console.log("Solo los links de ese archivo", data);
   links = [];

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {

      links.push({
        href: href,
        text: text,
        //title:title
       

      });
      //console.log("links encontrados", links)

    } //fin rendered
    marked(data, { renderer: renderer })
    validateLinks(links)
    statsUrl(links)
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
                  //console.log(file)
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
 
   return new Promise((resolve, reject) => {
    
    url.forEach(element => {
      
  fetch(element)
  .then(res => { 
                        // let urlArray= [];
                        // urlArray.push({
                        //   Url: res.url,
                        //   Text: element.text,
                        //   Status:res.status,
                        //   InfoStatus: res.statusText
                        // })
                        element.ok = res.ok;
                        element.status = res.status;
                        element.statusText = res.statusText;
                        resolve(element)
                        console.log("Url encontrada", element)
                       
                        //resolve(urlArray)

                        //console.log("Url encontrada!: ", urlArray);
  })  
  .catch((err)=> {
    reject(err)
})           
}) // fin forEach
   })

}//fin función validateLinks


/*Función que muestra Links totales y únicos*/
const statsUrl = (url) => {
  const urlCounter = url.map(element => element.href);
  const brokenLinks = url.filter(el => el.status < 0 || el.status > 400);
  //const totalLinks = urlCounter.length;
  const uniqueLinks = [...new Set(urlCounter)].length;
  console.log(`Links Totales:  ${chalk.bold.blue(urlCounter.length)}.`)
  console.log(`Links únicos:  ${chalk.bold.green(uniqueLinks)}.`)
  console.log(`Links rotos:  ${chalk.red(brokenLinks).length}.`)
}

module.exports= mdLinks;
//mdLinks;
// module.exports= validateLinks;
// module.exports= statsUrl;
