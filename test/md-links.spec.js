const mdLinks = require('../md-links')
const readLinks = require('../md-links')



describe('mdLinks', () => {

  it('debería retornar un links en el test/testFolder/test.md', async() => {
   await expect(mdLinks('test/testFolder/test.md')).resolves.toEqual([{"href": "https://facebook.com", "text": "http.get"}]);
  });

});

