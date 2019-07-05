#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const path = require('path');
let links = [];

/*Si es un archivo o ruta, llama a la función correspondiente*/ 
const mdLinks = (path, options={}) => {
  
  return new Promise ((resolve, reject) => {
    if(!path || !options ){
      throw(new Error("INGRESA UNA RUTA VÁLIDA!"))
    }

    fs.stat(path, (error, stats) => {
      if (error) {
        throw(new Error("Ingresa un archivo/ruta QUE EXISTA"))
        } 
      if (stats.isFile()) {
          readLinks(path)
          .then(url=>{
            resolve(url)
          })
          .catch(err=>{
            reject(err)
          })
          
      
      } if (stats.isDirectory()) {
        readRoute(path)
        .then(res=>{

         res.forEach(links=>{
          resolve(readLinks(links))

         })
        })
        .catch(err=>{
          reject(err)
        })
      }

  });
  
 }); // fin promise
  
}

/*F(x) para leer links convertida en promesa */ 
const readLinks = (files) => {

  return new Promise ((resolve, reject) => {
    
      if(path.extname(files) != '.md'){
      throw(new Error("Debes escoger un archivo con extensión MD"))
    }
  
    
  fs.readFile(files, "utf8", (err, data) => {
  
    if (err){
      reject(err)
    }
   //console.log("Solo los links de ese archivo", data);
   links = [];

    const renderer = new marked.Renderer();

    renderer.link = (href, title, text, ruta) => {

      links.push({
        href: href,
        text: text,
        ruta: files
      
      });
      //console.log("links encontrados", links)

    } //fin rendered
    marked(data, { renderer: renderer })
    resolve(links)


  }) //fin readFiles
  }) // fin promesa
} //Fin función readLinks




/*F(x) que lee directorios, posteriormente llama a readLinks*/
const readRoute = (route) => {
        return new Promise((resolve, reject)=>{
          fileHound.create() //sólo lee directorios
          .discard('node_modules')
          .paths(route)
          .ext('md')
          .find()
              .then(res=>{
              resolve(res)
              })
              .catch(err=>{
                reject(err)
              })
        })
 
}



// fetch llamado desde el index.js // está demás aquí.
 
// const validateLinks = (url) => {
//    return new Promise((resolve, reject) => {
//    url.forEach(element => {  
//   fetch(element)
//   .then(res => { 
//     let urlArray= [];
//                         urlArray.push({
//                           Url: res.url,
//                           Text: element.text,
//                           Status:res.status,
//                           InfoStatus: res.statusText
//                         })

//                         resolve(urlArray)
 
//   })  
//   .catch((err)=> {
//     reject(err)
// })           
// }) // fin forEach
//    })

// }//fin función validateLinks



/*Función que muestra Links totales y únicos, ahora llamada desde index.js */
// const statsUrl = (url) => {
//   const urlCounter = url.map(element => element.href);
//   const brokenLinks = url.filter(el => el.status < 0 || el.status > 400);
//   const uniqueLinks = [...new Set(urlCounter)].length;
//   // console.log(`Links Totales:  ${chalk.bold.blue(urlCounter.length)}.`)
//   // console.log(`Links únicos:  ${chalk.bold.green(uniqueLinks)}.`)
//   // console.log(`Links rotos:  ${chalk.red(brokenLinks).length}.`)
// }

module.exports= mdLinks;


