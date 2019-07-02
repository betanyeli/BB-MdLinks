const mdLinks = require('../md-links')
const readRoute = require('../md-links')



describe('mdLinks', () => {

  it('debería retornar un links en el test/testFolder/test.md', async() => {
   await expect(mdLinks('test/testFolder/test.md')).resolves.toEqual([{"href": "https://facebook.com", "text": "http.get"}]);
  });

  it('debería retornar los links de un directorio', async () => {
    await expect(mdLinks('test/testFolder')).resolves.toEqual([{"href": "https://facebook.com", "text": "http.get"}]);
   });
 
});

// describe('readRoute', () => {
// it('debería retornar los links de un directorio', async () => {
//   await expect(readRoute('test/testFolder')).resolves.toEqual([ { } ]);
//  });
// });