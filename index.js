#!/usr/bin/env node
const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
const fileHound = require('filehound'); // read directory
const fetch = require('node-fetch'); //links status
let commandUser = []; //array process vacío.
let links = [];


//Process argv

//console.log("process arvg", process.argv);
process.argv.forEach((val, index) => { // no quitar val!
  commandUser.push(process.argv[index])
  });
  //console.log("command", commandUser);

/*ProcessArvg position*/ 
fs.stat(commandUser[2], (error, stats) => {

    if (error) {
    console.log("error stats", error);
    } if (stats.isFile()) {
    readLinks(commandUser[2]);
    } if (stats.isDirectory()) {
    readRoute(commandUser[2]);
    }
  console.log("isFile", stats.isFile());
  console.log("isDirectory", stats.isDirectory());
});

// Paso como parámetro la ruta absoluta donde buscará
const readLinks = (files) => {
  //new Promise ((resolve, reject) => {

  fs.readFile(files, "utf8", (err, data) => {

    if (err) {
      throw err;
    }
   //console.log("Solo los links de ese archivo", data);

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {

      links.push({
        href: href,
        text: text,
        //title:title
        //file:path

      });

    }
    marked(data, { renderer: renderer })
   // console.log("Links pusheados en array", links)

    scanLinks(links)
  })

} //Fin función readLinks


//función que me extraerá los md de un directorio
const readRoute = (route) => {
  const readDirectory =
    fileHound.create() //sólo lee directorios
      .discard('node_modules')
      .paths(route)
      .ext('md')
      .find()
    readDirectory.then(read => {
    //console.log(read)
      read.forEach((file) =>{
      //console.log(file)
      readLinks(file) // Llamo a readlinks
    
    });
  });
  // readDirectory.then(console.log);
  //console.log("readDirectory", readDirectory)
}

// fetch
const scanLinks = (url) => {
  let urlArray = []; //Array de links del fetch
  //urlArray
  url.forEach(element => {
    let urlObject = {}; //Objects del array de links del fetch
    //urlObject
    fetch(element)
      .then(res => {
        urlObject.href = element.href;
        urlObject.ok = res.ok;
        urlObject.status = res.status;
        urlObject.statusText = res.statusText;
        urlArray.push(urlObject);
        console.log(urlArray)
      });
      return urlArray;
  }); // fin foreach
 
 
}//fin función scanLinks
