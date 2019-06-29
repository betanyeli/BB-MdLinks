#!/usr/bin/env node
const mdLinks = require('./md-links')
let commandUser = []; //array process vacío.

/*Process arvg position */
process.argv.forEach((val, index) => { //  Val es un parámetro obligatorio.
  commandUser.push(process.argv[index])
  });

mdLinks(commandUser[2])