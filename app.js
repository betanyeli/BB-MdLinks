const fs = require('fs'); // leo los archivos
const marked = require('marked'); // extraigo los links y los meto en array
//const route = require('path'); // ruta de mi archivo
const FileHound = require('filehound');

 
//  is absolute method y resolve pa convdertir en absolute, process argv

// Paso como parámetro la ruta absoluta donde buscará
const links = (path) =>{
      fs.readFile(path,"utf8", (err,data) =>{ // quita esto de aquí
        if(err){
            throw err;
          }
          console.log(data);
          let links =[];
      
          const renderer = new marked.Renderer();
      
          renderer.link = function(href, title, text){
      
            links.push({
              
              href:href,
              text:text,
              file:path
            
            })
      
          }
          marked(data, {renderer:renderer})
            console.log(links)
    }) // quita esto de aqui
    
    }

  
  console.log(links('./prueba.md'));
//console.log(links('./testing'));
 //console.log(route.extname('./prueba.md') );
// Returns: '.md'

 
const files = FileHound.create() //sólo lee directorios
  .paths('./testing')
  .ext('md')
  .find();
 
files.then(console.log);