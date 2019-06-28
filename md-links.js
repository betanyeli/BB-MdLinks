const mdLinks= (path, options) => {
    return new Promise ((resolve, reject) => {
        fs.stat(path, (error, stats) => {

            if (error) {
           return reject(error)
            } if (stats.isFile()) {
            resolve(readLinks)
            } if (stats.isDirectory()) {
            resolve(readRoute);
            }
        //   console.log("isFile", stats.isFile());
        //   console.log("isDirectory", stats.isDirectory());
        });
        if(options.validate){
            return validateLinks(path)
          }
        // if(options.stats){
        //     return statsLinks(path)
        //   }
    })
    // if(options.stats && options.validate){
    //     return promiseAllDe validate y stats?
    //   }  

}
module.exports = mdLinks;