const mdLinks = require('../md-links')
//const readRoute = require('../md-links')



describe('mdLinks', () => {

  it('debería retornar un links en el test/testFolder/test.md', async() => {
   await expect(mdLinks('test/testFolder/test.md')).resolves.toEqual([ { href: 'https://facebook.com',
   text: 'http.get',
   ruta: 'test/testFolder/test.md' } ]
);
  });

  it('debería retornar los links de un directorio', async () => {
    await expect(mdLinks('test/testFolder')).resolves.toEqual([ { href: 'https://facebook.com',
    text: 'http.get',
    ruta: 'test\\testFolder\\test.md' } ]
);
   });

   it('debería retornar msj de error si el archivo no es .md', async () => {
    await expect(mdLinks('test/testFolder/main.js')).rejects.toThrow("Debes escoger un archivo con extensión MD");
   });
 
   it('debería retornar msj de error si no colocó ruta o archivo', async () => {
    await expect(mdLinks()).rejects.toThrow("INGRESA UNA RUTA VÁLIDA!");
   });
});

//testear si es un archivo md, testear si el archivo no es válido, si el archivo no tiene nada.