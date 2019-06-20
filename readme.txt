argv argumentos pro consola
[]
archivo md o ruta
validate
stats

process.argv[0] node env. arreglo de strings
[1] pwd donde está el ejecutable
[2] options (validate, stats

Primero: leer argv
Extraer cosas = ruta o archivo, option 1, option 2.
Cuando ya tengo mis vainas en el arreglo [file.md , file2.md]
fs.readFile(path, utf8, callback){
    convertir esta funcion en una promesa!!!!!!!!
}
const readfilepromise = readFileAsaPromise (path)
.then() no entiendo.
// process arv PESCA DEL DOS EN ADELANTE. 2 es la ruta, 3 es el validate o stats
let validate = false;
let stats = false;