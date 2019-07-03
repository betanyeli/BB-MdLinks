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
  return new Promise ((resolve, reject) => {
    if(!path || !options ){
      return console.log("INGRESA UNA RUTA VÁLIDA!")
    }
    fs.stat(path, (error, stats) => {
      if (error) {
        reject (error)   

        } 
      if (stats.isFile()) {
          readLinks(path).then(url=>{
            console.log("-------------------Resultados de búsqueda------------------*")
            console.log(url)
            console.log("------------------------------------------------------------")
            
            resolve(url)
            
          })
          
      
      } if (stats.isDirectory()) {
        readRoute(path)
        .then(res=>{

         res.forEach(links=>{
          resolve(readLinks(links))
          console.log("-------------------Resultados de búsqueda------------------*")
          console.log(links)
          console.log("------------------------------------------------------------")

          
         })

        })
      }

  });
  
  
                if (options.validate && options.stats){
                  readLinks(path).then(url=>{
                    console.log("url", url)
                    validateAndStatsUrl(url)
                  })
                } if(options.validate){
                  readLinks(path).then(url=>{
                    validateLinks(url)
                  })
                } if(options.stats){
                  readLinks(path).then(url=>{
                    statsUrl(url)
                  })
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
   //console.log("Solo los links de ese archivo", data);
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
    validateAndStatsUrl(links)
    resolve(links)
  }) //fin readFiles
  })
 
} //Fin función readLinks



/*F(x) que lee directorios, posteriormente llama a readLinks*/
const readRoute = (route) => {
    //const readDirectory = 
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
        

        //      readDirectory.then(read=>{
        //        console.log("test", read)
        //         read.forEach((file) =>{
        //           console.log("test", file)
        //             readLinks(file) // Llamo a readlinks
        //               .then(res=>{
        //                 // validateLinks(res)
        //                 // statsUrl(res)
        //                 console.log("readRoute", res)
        //               })
        //     })
        // })
        //     .catch(err=>{
        //     console.log(err)
    //})

}



// fetch
 

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

                        // console.log(chalk.bgCyan("----------------------------Link-----------------------------"))
                        // console.log("Url ==>: ", chalk.bold.blue(res.url))
                        // console.log(chalk.bgGreen("-------------------Información de este link------------------"))
                        
                        // console.log("Text =>: ", chalk.bold.magenta(element.text))
                        // console.log("Código de respuesta ==>:", chalk.bold.red(res.status))
                        // console.log("Info ==>: ", chalk.bold.yellow(res.statusText))
                        // console.log("----------------------------Fin------------------------------")
                       
                        resolve(urlArray)

                        
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
  // console.log(`Links Totales:  ${chalk.bold.blue(urlCounter.length)}.`)
  // console.log(`Links únicos:  ${chalk.bold.green(uniqueLinks)}.`)
  // console.log(`Links rotos:  ${chalk.red(brokenLinks).length}.`)
}

const validateAndStatsUrl = (url) =>{
  validateLinks(url)
  statsUrl(url)
}

module.exports= mdLinks;
//mdLinks;
// module.exports= validateLinks;
// module.exports= statsUrl;