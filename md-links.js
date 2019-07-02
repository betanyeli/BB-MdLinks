#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const path = require('path');
const fetch = require('node-fetch'); //links status
const chalk = require('chalk');
let links = [];


/*Si es un archivo o ruta, llama a la función correspondiente*/ 
const mdLinks = (path, options={}) => {
  // if(path === false || options === false){
  //   return console.log("INGRESA UNA RUTA VÁLIDA!")
  // }
  
  return new Promise ((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        throw (error)   

        } if (stats.isFile()) {
          readLinks(path).then(url=>{
            console.log("-------------------Resultados de búsqueda------------------*")
            console.log(url)
            console.log("------------------------------------------------------------")
            resolve(url)
          })
          
           //console.log(validateLinks(url)) //return promise pending! fix this bug!
          
      
      } if (stats.isDirectory()) {
        resolve(readRoute(path))

      } 

  });

  if (options.validate && options.stats){
    readLinks(path)
    
    
  } if(options.validate){
    return validateLinks(path)
  } if(options.stats){
    return statsUrl(path)
  } 
 
 }); // fin promise
  
}

/*F(x) para leer links convertida en promesa */ 
const readLinks = (files) => {
  return new Promise ((resolve, reject) => {

  fs.readFile(files, "utf8", (err, data) => {
  
    if (err){
      reject(err)
    }
   console.log("Solo los links de ese archivo", data);
   links = [];

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {

      links.push({
        href: href,
        text: text,
        //title:title
       

      });
      console.log("links encontrados", links)

    } //fin rendered
    marked(data, { renderer: renderer })
    validateLinks(links)
    
    resolve(links)
    statsUrl(links)
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
                      .then(res=>{
                        console.log("readRoute", res)
                      })
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
                        let urlArray= [];
                        urlArray.push({
                          Url: res.url,
                          Text: element.text,
                          Status:res.status,
                          InfoStatus: res.statusText
                        })
                                    // element.ok = res.ok;
                                    // element.status = res.status;
                                    // element.statusText = res.statusText;
                                    // resolve(element)
                        console.log(chalk.bgCyan("----------------------------Link-----------------------------"))
                        console.log("Url ==>: ", chalk.bold.blue(res.url))
                        console.log(chalk.bgGreen("-------------------Información de este link------------------"))
                        
                        console.log("Text =>: ", chalk.bold.magenta(element.text))
                        console.log("Código de respuesta ==>:", chalk.bold.red(res.status))
                        console.log("Info ==>: ", chalk.bold.yellow(res.statusText))
                        console.log("----------------------------Fin------------------------------")
                       
                        resolve(urlArray)

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