#!/usr/bin/env node
"use strict"
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;
const fs = require('fs');



let myPromise = Promise.resolve("KLAJHDKJASHDHAJKHDAKJHDKJAHD");
myPromise
.then( res => {
    console.log("resolve", res);
});

let myOtherPromise = new Promise((resolve, reject)=>{
setTimeout (() => 
    resolve(5), 2000);

});

// myOtherPromise
// .then(res => {
//     res +=5;
//     console.log("res", res);
// });

const getData = (url) => {

    return new Promise((resolve, reject) => {
        fetchUrl(url, (error, meta, body) => {
            if (meta){ // meta objeto q contiene status, httpcode, header, finalUrl, redirectCount, cookie
                //console.log(meta)
                resolve(meta.status.toString());
            } else {
                reject(error);
            }
        });
    });
}

let url = "https://www.google.com";

// getData(url)
// .then(res => { // el res es mi resolve
//     console.log("El estado del sitio" , url , "es:", res)
// })
// .catch(err => {
//     console.log(err);
// })

const readAFile = (fileName, type) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8", (error, content)=>{
            // if (error) {
            //     reject(error)
            // } else {
            //     resolve(content)
            // }
            error ? reject(error) : resolve(content); 
            //es un error? reject : si no? resolve
        })
    })
}

// readAFile("prueba.md", "utf8")
//     .then(res => {
//         console.log("tu archivo dice", res)
//     })
//     .catch(err => {
//         console.log(err)
//     })
//la delcaración de la funcion uso resolve y reject
//en la llamada uso el then y el catch

Promise.all([myPromise, myOtherPromise, getData(url), readAFile("prueba.md", "utf8")])
.then(res=> {
    console.log(res[3])
})
.catch(err => {
    console.log(err)
})

