new Promise((resolver, rechazar) => {
  console.log('Inicial');

  resolver();
})
.then(() => {
  throw new Error('Algo falló');
      
  console.log('Haz esto');
})
.catch(() => {
  console.log('Haz eso');
})
.then(() => {
  console.log('Haz esto sin que importe lo que sucedió antes');
});

// let procesoLento = new Promise((resolve, reject) => {
//     let datos = {};
//     //...
//     //muchas lineas de código
//     //...
//     if (error) {
//       //uh oh, las cosas no salieron tan bien
//       reject(new Error('Fallamos, lo siento'));
//     }
//     //...
//     resolve(datos);
//   });
  
  //fab
  // const fs = require('fs');
  // const pathNode = require('path');
  // const marked = require('marked');
  // const fetch = require('node-fetch');
  
  // const markdownLinkExtractor = (markdown)=>{
  //   var links = [];
  
  //   var renderer = new marked.Renderer();
  
  //   renderer.link = function (href, title, text) {
  //       links.push({
  //         href: href,
  //         text: text
  //       });
  //   };
   
  //   marked(markdown, { renderer: renderer });
  
  //   return links;
  // };
  
  const mdLinks = (userPath, options={validate:true})=>{
    const thePromise = new Promise((resolve, reject)=>{
      const thePath = pathNode.resolve(userPath);
      fs.lstat(thePath, (error, stats)=>{ // Asynchronous lstat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.
        if(error){
          return reject(error);
        }
        if(stats.isFile()){ // Returns true if the fs.Stats object describes a regular file.
          fs.readFile(thePath,'utf-8', (error, file)=>{
            if(error){
              return reject(error);
            }
            let links = markdownLinkExtractor(file);
            links = links.map(link =>{
              link.file = thePath;
              return link;
            });
            return resolve(links);
          });
        }else if(stats.isDirectory()){ //Returns true if the fs.Stats object describes a file system directory.
          fs.readdir(thePath, (error, dirContents)=>{
            const promises = dirContents.map(theFile => {
              return mdLinks(`${thePath}${pathNode.sep}${theFile}`, options);
            });
            Promise.all(promises)
              .then(theResults => {
                return resolve(theResults.reduce((prev, elem)=> prev.concat(elem), []));
              });
          });
        }else{
          resolve([]);
        }
      });
    });
  
    if(options.validate){
      return thePromise
        .then((links)=>{
          const theFetchs = links.map(link => {
            return new Promise((resolve, reject)=>{
              fetch(link.href)
                .then((resp)=>{
                  if(resp.ok){
                    link.status = 'OK';
                    resolve(link);
                  }else{
                    link.status = 'FAIL';
                    resolve(link);
                  }
                })
                .catch((fetchError)=>{
                  link.status = 'FAIL';
                  resolve(link);
                });
            });
          });
  
          return Promise.all(theFetchs)
        });
    }else{
      return thePromise;
    }
  }
  
  if(require.main === module){
    mdLinks(process.argv[2])
      .then(console.log);
  }
  
  module.exports = mdLinks;